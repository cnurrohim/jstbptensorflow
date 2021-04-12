import {Table} from '../Lib/Table.js';
import {prediksisetRandom,tahunPrediksiSet,variables} from '../Data/DataMaster.js';
import {data_wilayah} from '../Data/JS/dataWilayah.js';
import {
	getStorage,
	setStorage,
	dataPrediksiStorage,
	dataInputPrediksiStorage,
	tahunPrediksiStorage
} from '../Lib/Storage.js';

let PrediksiData = getStorage(dataInputPrediksiStorage);
let tahunPrediksi = getStorage(tahunPrediksiStorage);



let prediksiDataInput = [];
if(PrediksiData.length > 0){
	prediksiDataInput = PrediksiData;
}else{
	prediksiDataInput = prediksisetRandom;
}

const input = function(row,tahunPrediksiSet,idtahun,idVar){

	return {
		tag:'input',
		attributes:{
			'type':'text',
			'id-tahun':idtahun,
			'tahun-prediksi':tahunPrediksiSet[idtahun],
			'variable':variables[idVar],
			'wilayah':row.wilayah,
			'class':'id-'+tahunPrediksiSet[idtahun]+'-'+row.wilayah+'-'+idVar+' data-'+tahunPrediksiSet[idtahun]+' inputW60 inputPrediksi',
			'value':row[variables[idVar]]
		}
	}
}

const propertiesTableAsli = {
	'cellspacing':0,
	'border':0,
	'class':'datapick'
};

let dataTable = new Table(propertiesTableAsli);

let iteration = 0;
prediksiDataInput.forEach((dataPerTahun,idtahun)=>{

	const rowProperties1 = {
		'class':'cl_accents no-select select-head head-'+tahunPrediksiSet[idtahun],
		'data-id':tahunPrediksiSet[idtahun]
	}

	const tableHeaderAsli = [
		{
			content:'Data Tahun '+tahunPrediksiSet[idtahun],
			attributes: {
				'colspan':variables.length+2,
				class: 'ft_size_content font_pairs font_accents lighter toggleClassHidden head-'+tahunPrediksiSet[idtahun],
				'data-id':tahunPrediksiSet[idtahun]
			}
		}
	];


	let tableHeader2 = [
		{content:'#'},
		{content:'Wilayah',attributes:{'style':'width:250px;'}}
	];

	variables.forEach((variable,idVar)=>{
		tableHeader2.push({content:variable});
	});

	const hidden = (iteration == 0) ? '': 'hidden' ;
	iteration++;
	const rowProperties2 = {
		'class':'ft_size_xs font_pairs font_accents lighter cl_secondary '+hidden+' body-'+tahunPrediksiSet[idtahun]
	}

	dataTable.addNewRow(tableHeaderAsli,false,'td',rowProperties1);
	dataTable.addNewRow(tableHeader2,false,'td',rowProperties2);


	let td_data = [];
	dataPerTahun.forEach((row,index)=>{
		
		let target = '-';
		if(prediksiDataInput[idtahun]){
			target = (prediksiDataInput[idtahun][index].target) ? prediksiDataInput[idtahun][index].target.toFixed(2) : '-' ;
		}
		
		td_data = [
			{content:index+1},
			{content:data_wilayah[row.wilayah],attributes:{class:'camel-case'}}
		];

		variables.forEach((variable,idVar)=>{
			td_data.push({content:input(row,tahunPrediksiSet,idtahun,idVar)});
		});

		dataTable.addNewRow(td_data,false,'td',rowProperties2);
	});
});

export const inputPrediksi = dataTable;


