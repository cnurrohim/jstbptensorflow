import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPengujian.js';
import {variables,jmlTargetJST} from '../Data/DataMaster.js';
import {Table} from '../Lib/Table.js';

import {data_wilayah} from '../Data/JS/dataWilayah.js';

// coding library feedfoward
import Matrix from '../Lib/Matrix.js';
import NN from '../Lib/nn.js';

import {
	tahunDataSet,
	dataset,
	dataTargetMinMax,
	denormalisasi,
} from '../Data/DataMaster.js';

import {
	BASE_URL,
	getStorage, 
	setStorage, 
	settingTrainingStorage,
	usedSettingPengujianStorage,
	dataPengujianStorage,
	trainingResultStorage
} from '../Lib/Storage.js';
	
createNav('Pengujian');
createSubNav('Pengujian');

const dataPengujian = getStorage(dataPengujianStorage);


const settingTraining = getStorage(settingTrainingStorage);
const trainingResults = getStorage(trainingResultStorage);
const usedSettingPengujian = getStorage(usedSettingPengujianStorage);

const btn_pengujian = document.querySelector('#startPengujian');
const btn_resetPengujian = document.querySelector('#resetPengujian');

const usedJST = [];
const performanceRecord = [];
usedSettingPengujian.forEach((idSetting)=>{
	performanceRecord.push({idSetting:idSetting,failCount:0,totalRecord:0,totalError:0,totalSquaredError:0});

	const results = trainingResults.find((result)=>{
		return result.idSetting == idSetting;
	})

	const mse = (results) ? Number(results.mse).toFixed(9) : '-' ;
	const epoch = (results) ? results.epoch : '-' ;

	settingTraining[idSetting].mse = mse;
	settingTraining[idSetting].epoch = epoch;
	settingTraining[idSetting].idSetting = idSetting;
	usedJST.push(settingTraining[idSetting]);
});


const tableProperties = {
	'cellspacing':0,
	'class':'font_pairs font_accents lighter '
};

const dataTable = new Table(tableProperties);

const header = [
	{content:'#',attributes:{rowspan:2}},
	{content:'Tahun',attributes:{rowspan:2}},
	{content:'Wilayah',attributes:{rowspan:2}},
	{content:'X1',attributes:{rowspan:2}},
	{content:'X2',attributes:{rowspan:2}},
	{content:'X3',attributes:{rowspan:2}},
	{content:'X4',attributes:{rowspan:2}},
	{content:'X5',attributes:{rowspan:2}},
	{content:'X6',attributes:{rowspan:2}},
	{content:'X7',attributes:{rowspan:2}},
	{content:'Aktual',attributes:{rowspan:2}},
];


usedJST.forEach((setting)=>{
	header.push({content:'JST '+ setting.arsitekturJST.replace(/ /g,'-'),attributes:{colspan:jmlTargetJST*3} });
});

const headerPropterties = {
		'class':'cl_accents'
};


dataTable.addNewRow(header,false,'th',headerPropterties);
const header2 = [];
usedJST.forEach((setting)=>{
	header2.push({content:'Output',attributes:{colspan:jmlTargetJST}});
	header2.push({content:'Selisih',attributes:{colspan:jmlTargetJST}});
	header2.push({content:'Square Error',attributes:{colspan:jmlTargetJST}});
});

dataTable.addNewRow(header2,false,'th',headerPropterties);

let no = 0;

const bodyProperties = {
	'class' : 'cl_tertiary'
}


dataPengujian.forEach((dataPerTahun,i)=>{
	dataPerTahun.forEach((data,index)=>{
		
		const targetMinMax = dataTargetMinMax.find((dataMinMax)=>{
			return dataMinMax.tahun == data.tahunData;
		});



		const listData = [
			{content:(++no)},
			{content:data.tahunData},
			{content:(data_wilayah[data.idWilayah])},
			{content:data.nilaiFitur.matrix[0][0].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][1].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][2].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][3].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][4].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][5].toFixed(4)},
			{content:data.nilaiFitur.matrix[0][6].toFixed(4)},
			{content:data.target[0].toFixed(2)}
		];

		usedJST.forEach((setting,index)=>{
			let totalSquaredError = 0;
			let totalError = 0;
			
			const fail = performanceRecord.find((fail)=>{
				return fail.idSetting == setting.idSetting;
			});
			
			let is_errorExist = false;
			let errorCount = 0;
			for (let i = 0; i < jmlTargetJST; i++){

				let content = '';
				let loss = 0;
				let error = 0;
				let hasilTargetAsli = 0;

				

				if(data.hasilPengujian){
					const results = data.hasilPengujian.find((hasil)=>{
						return hasil.idSetting == setting.idSetting;
					});

					
					
					if(results){
						content = results.result.toFixed(4);
						loss = (data.target[0] - results.result).toFixed(4);
						error = Math.pow(data.target[0] - results.result,2).toFixed(4);
						totalError += (data.target[0] - results.result);
						totalSquaredError += Math.pow(data.target[0] - results.result,2);
					}
				}
				listData.push({content:content});
				listData.push({content:loss});
				listData.push({content:error});
			}
			
			if(is_errorExist){
				
				fail.failCount++;
			}
			
			

			fail.totalError += totalError;
			fail.totalSquaredError += totalSquaredError;
			fail.totalRecord = no;

		});
		
		dataTable.addNewRow(listData,false,'td',bodyProperties);
	});
});

const totalPerformance = [
	{content:'Total',attributes:{colspan:12}}
];



usedJST.forEach((setting,index)=>{
	const record = performanceRecord.find((record)=>{
		return record.idSetting == setting.idSetting;
	});


	totalPerformance.push({content:record.totalError.toFixed(7)});
	totalPerformance.push({content:record.totalSquaredError.toFixed(7)});
});

const performance = [
	{content:'Rata-Rata Error | MSE Pengujian',attributes:{colspan:12}}
];

usedJST.forEach((setting,index)=>{
	const record = performanceRecord.find((record)=>{
		return record.idSetting == setting.idSetting;
	});

	
	let performance_stat = 0;
	let errorAverage = 0;
	
	if(record.totalRecord != 0){
		performance_stat = (record.totalSquaredError/record.totalRecord).toFixed(7);
		errorAverage = (record.totalError/record.totalRecord).toFixed(7);
	}

	performance.push({content:errorAverage});
	performance.push({content:performance_stat});
});

dataTable.addNewRow(totalPerformance,false,'td',bodyProperties);
dataTable.addNewRow(performance,false,'td',bodyProperties);

dataTable.displayTable('#list-setting');

if(usedJST.length == 0){
  const alert = document.querySelector('#alert');
  alert.innerHTML = 'Arsitektur / Model JST belum dipilih';
  alert.classList.add('alert');
  
  btn_pengujian.classList.add('hidden');
}

if(dataPengujian.length > 0){
	if(dataPengujian[0][0].hasilPengujian){	
	  btn_pengujian.classList.add('hidden');
	  btn_resetPengujian.classList.remove('hidden');
	}
}else{
  btn_pengujian.classList.add('hidden');
}

btn_resetPengujian.addEventListener('click', (e)=>{
	e.preventDefault();


	dataPengujian.forEach((dataPerTahun,indexTahun)=>{
		dataPerTahun.forEach((data,indexData)=>{
			delete data.hasilPengujian;
		});
	});
	
	setStorage(dataPengujianStorage,dataPengujian);
	window.location.reload();
});


btn_pengujian.addEventListener('click',async (e)=>{
	e.preventDefault();

	dataPengujian.forEach(async (dataPerTahun,indexTahun)=>{
		dataPerTahun.forEach(async (data,indexData)=>{

			const hasilPengujian = [];

			usedSettingPengujian.forEach( async (idSetting)=>{
				const results = trainingResults.find((result)=>{
					return result.idSetting == idSetting;
				});

				const modelName = 'model_no_'+idSetting
				const modelUrl = 'localstorage://'+modelName;
				const model =  await tf.loadLayersModel(modelUrl);
				
				const pickedTraining = settingTraining[idSetting];
				

				const topology = pickedTraining.arsitekturJST.split(" ").map((layer)=>{
			    	return Number(layer);
			  	});



				let bobot = [];
				let bias = [];
				let shape = [];
				for (let layer = 0; layer < topology.length - 1; layer++) {
					shape[layer] = model.layers[layer].getWeights()[0].shape;
					bobot[layer] = [...model.layers[layer].getWeights()[0].dataSync()];
					bias[layer] = [...model.layers[layer].getWeights()[1].dataSync()];
				}
				


				
				let mBobot = [];
				let mBias = [];

				let mtBobot = [];
				let mtBias = [];
				for (let layer = 0; layer < topology.length - 1; layer++) {
					
					mBobot[layer] = Matrix.fromArray(bobot[layer],shape[layer][0],shape[layer][1]);
					mBias[layer] = Matrix.fromArray(bias[layer],1,shape[layer][1]);

					mtBobot[layer] = Matrix.transpose(mBobot[layer]);
					mtBias[layer] = Matrix.transpose(mBias[layer]);
				}


				// CODING LIBRARY SENDIRI PREDIKSI
				const nn = new NN();

				nn.setWeights(mtBobot);
				nn.setBiases(mtBias);
				let neurons = Matrix.fromArray(data.nilaiFitur.matrix[0],data.nilaiFitur.matrix[0].length,1);
				

				const hasilPrediksi = nn.predict(data.nilaiFitur.matrix[0]);
				
				hasilPengujian.push(
					{
						idSetting:idSetting,
						result:hasilPrediksi[0]
					}
				);
				

			});

			data.hasilPengujian = hasilPengujian;
		});
	});

	await delay();
	setStorage(dataPengujianStorage,dataPengujian);
	window.location.reload();
});


function delay() {
  return new Promise(resolve => setTimeout(resolve, -1000));
}