import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPrediksi.js';
import {Table} from '../Lib/Table.js';

// coding library feedfoward
import Matrix from '../Lib/Matrix.js';
import NN from '../Lib/nn.js';

import {
	getStorage,
	setStorage,
	settingTrainingStorage,
	usedSettingPrediksiStorage,
	trainingResultStorage,
	dataPrediksiStorage,
    dataInputPrediksiStorage,
    tahunPrediksiStorage,
    minMaxPrediksiStorage,
    prediksiNormalisasiStorage,
    hasilPrediksiStorage
} from '../Lib/Storage.js';

import {
	clusterColor,
	getKeyByValue,
	jmlTargetJST,
	kategoriTarget,
	getIdWarnaHasilDenormalisasi,
	denormalisasi,
	dataTargetMinMax,
	targetDataset,
	tahunDataSet,
	getMin,
	getMax,variables
} from '../Data/DataMaster.js';

import {delay,changeMapRegionColor} from '../Lib/map.js';

createNav('Prediksi');
createSubNav('Prediksi');

let warning = [];

const settingTraining = getStorage(settingTrainingStorage);

const hasilPrediksi = getStorage(hasilPrediksiStorage);
const tahunPrediksi = getStorage(tahunPrediksiStorage);
const dataPrediksi = getStorage(prediksiNormalisasiStorage);
const dataInputPrediksi = getStorage(dataInputPrediksiStorage);
const minMax = getStorage(minMaxPrediksiStorage);

const usedSettingPrediksi = getStorage(usedSettingPrediksiStorage);

let alltahun = [...tahunDataSet, ...tahunPrediksi];

const alltarget = [];
targetDataset.forEach((setData)=>{
	setData.forEach((data)=>{
		alltarget.push({target:data.target});
	});
});


const targetMin = getMin(alltarget,'target');
const targetMax = getMax(alltarget,'target');


const btnSave = document.querySelector('#btn_save');
const btnStart = document.querySelector('#btn_start');
//const btnHapus = document.querySelector('#btnHapusHasil');
//const btnHasil = document.querySelector('#btnTampilHasil');

let model;
let topology = [];
async function loadModel(idSetting){
	
	const modelName = 'model_no_'+idSetting;
	const modelUrl = 'localstorage://'+modelName;
	model =  await tf.loadLayersModel(modelUrl);

	const pickedTraining = settingTraining[idSetting];

	topology = pickedTraining.arsitekturJST.split(" ").map((layer)=>{
    	return Number(layer);
  	});
}

if(usedSettingPrediksi != null){
	console.log(usedSettingPrediksi);
	loadModel(usedSettingPrediksi);
}else{
	// btnHasil.classList.add('hidden');
	// btnSave.classList.add('hidden');
	// btnHapus.classList.add('hidden');
	btnStart.classList.add('hidden');
}

if(hasilPrediksi.length > 0){
	const telahDiprediksi = hasilPrediksi.filter((hasil)=>{
		return hasil.idSetting == usedSettingPrediksi;
	});

	if(telahDiprediksi.length > 0){
		btnStart.classList.add('hidden');
		//btnSave.classList.add('hidden');
	}else{
		//btnHasil.classList.add('hidden');
		//btnSave.classList.add('hidden');
		//btnHapus.classList.add('hidden');
	}
}

if(dataPrediksi === 'null'){
	warning.push('belum ada data untuk dilakukan proses Prediksi');
}


async function startProsesPrediksi(){
	let promise = Promise.resolve();

	targetDataset.forEach(async (setData,tahunIndex) => {
		setData.forEach(async (data,idData)=>{
			promise = promise.then(async function () {
				document.querySelector("[href='#map-"+alltahun[tahunIndex]+"']").click();
				await delay(20);

				let indeksKesehatan = (data.target - 20) / (85 - 20);

				// rendah
				let tingkatKesehatan = 0;

				if(indeksKesehatan >= 0.59){
					// sedang
					tingkatKesehatan = 1;
				}

				if(indeksKesehatan >= 0.69){
					// tinggi
					tingkatKesehatan = 2;
				}

				if(indeksKesehatan >= 0.79){
					// tinggi sekali
					tingkatKesehatan = 3;
				}

				const newParameter = [data.target,indeksKesehatan.toFixed(2)];

				changeMapRegionColor(alltahun[tahunIndex],data.wilayah,tingkatKesehatan,newParameter);
				await delay(20);
			});
		});
	});


dataPrediksi.forEach(async (setData,tahunIndex)=>{
	setData.forEach(async (data,idData)=>{
		promise = promise.then(async function () {
			document.querySelector("[href='#map-"+alltahun[tahunIndex+5]+"']").click();
			await delay(20);

			const nilaiPerVariable = [];
			variables.forEach((variable)=>{
				nilaiPerVariable.push(data[variable]);
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
				mBias[layer] = Matrix.fromArray(bobot[layer],1,shape[layer][1]);

				mtBobot[layer] = Matrix.transpose(mBobot[layer]);
				mtBias[layer] = Matrix.transpose(mBias[layer]);
			}
			
			// CODING LIBRARY SENDIRI PREDIKSI
			const nn = new NN();

			nn.setWeights(mtBobot);
			nn.setBiases(mtBias);
			
			
			const hasilPrediksi = nn.predict(nilaiPerVariable);
			
			const AHH = denormalisasi(hasilPrediksi[0],targetMin,targetMax);
			
			dataInputPrediksi[tahunIndex][idData].target = AHH;
			let indeksKesehatan = (AHH - 20) / (85 - 20);
			

			// rendah
			let tingkatKesehatan = 0;

			if(indeksKesehatan >= 0.59){
				// sedang
				tingkatKesehatan = 1;
			}

			if(indeksKesehatan >= 0.69){
				// tinggi
				tingkatKesehatan = 2;
			}

			if(indeksKesehatan >= 0.79){
				// tinggi sekali
				tingkatKesehatan = 3;
			}


			const f_AHH = AHH.toFixed(2);
			const f_indeksKesehatan = indeksKesehatan.toFixed(2);

			const newParameter = [f_AHH,f_indeksKesehatan];

			changeMapRegionColor(alltahun[tahunIndex+5],data.wilayah,tingkatKesehatan,newParameter);
			await delay(10);
		});
		await promise;
		
	});
});

	
}


// btnHapus.addEventListener('click',(e)=>{
// 	e.preventDefault();
	
// 	const filteredHasil = hasilPrediksi.filter((hasil)=>{
// 		return hasil.idSetting != usedSettingPrediksi;
// 	});

	
// 	setStorage(hasilPrediksiStorage,filteredHasil);
// 	window.location.reload();
// });


btnSave.addEventListener('click',(e)=>{
	e.preventDefault();
	
	setStorage(dataInputPrediksiStorage,dataInputPrediksi);
	//setStorage(hasilPrediksiStorage,hasilPrediksi);
	//window.location.reload();
});


btnStart.addEventListener('click',(e)=>{
	e.preventDefault();
	
	if(warning.length > 0 ){
		warning.forEach((msg)=>{
			const alert = document.createElement('p');
			alert.classList.add('alert');
			alert.innerHTML = msg;
			const mc = document.querySelector('.main-container');
			mc.appendChild(alert);
		})
		return false;
	}

	startProsesPrediksi();
	//btnSave.classList.remove('hidden');
});


const tableProperties = {
	'cellspacing':0,
	'cellpadding':'2px',
	'border':0
};

const trProperties = {
	'class':'no-select select-head '
}

const dataTable = new Table(tableProperties);

let tableTitle = [
	{
		content: 'Rentang Skala :',
		attributes:{
			colspan:6,
			class:'toggleClassHidden head-rentangskala',
			'data-id':'rentangskala'
		}
	}
];

dataTable.addNewRow(tableTitle,false,'td',trProperties);

let rowProperties = {
	'class':'body-rentangskala'
}

let rowRendah = ['Rendah','0.00 - 0.59'];
let rowSedang = ['Sedang','0.60 – 0.69'];
let rowTinggi = ['Tinggi','0.70 – 0.79'];
let rowTinggiSekali = ['Sangat Tinggi','0.80 – 1'];

dataTable.addNewRow(rowTinggiSekali,false,'td',{'class':'blue'});
dataTable.addNewRow(rowTinggi,false,'td',{'class':'green'});
dataTable.addNewRow(rowSedang,false,'td',{'class':'yellow'});
dataTable.addNewRow(rowRendah,false,'td',{'class':'red'});

dataTable.displayTable(".data-table");
