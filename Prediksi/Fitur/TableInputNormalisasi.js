import {Table} from '../../Lib/Table.js';
import {
	prediksiset,
	tahunPrediksiSet,
	tahunDataSet,
	dataset,
	getMin,
	getMax,
	variables,
	normalisasi,
	targetDataset
} from '../../Data/DataMaster.js';
import {data_wilayah} from '../../Data/JS/dataWilayah.js';
import {
	getStorage,
	setStorage,
	dataPrediksiStorage,
	dataInputPrediksiStorage,
	tahunPrediksiStorage
} from '../../Lib/Storage.js';

//let PrediksiData = getStorage(dataInputPrediksiStorage);
let prediksiDataInput = getStorage(dataInputPrediksiStorage);
let tahunPrediksi = getStorage(tahunPrediksiStorage);


// let prediksiDataInput = [];
// if(PrediksiData.length > 0){
// 	prediksiDataInput = PrediksiData;
// }else{
// 	prediksiDataInput = prediksiset;
// }



let datasetwithinputset = [...dataset,...prediksiDataInput];
let alldataset = [];

let alltahun = [...tahunDataSet, ...tahunPrediksi];


datasetwithinputset.forEach((data,key)=>{	
	data = data.map((record,idrecord)=>{
		record.target = (targetDataset[key]) ? targetDataset[key][idrecord].target : '-';
		record.tahun = alltahun[key];
		return record;
	});
	
	alldataset.push(...data);
});

let dataSetMinMax = [];
variables.push("target");
variables.forEach((variable,index)=>{
	dataSetMinMax[variable] = {
		min:getMin(alldataset,variable),
		max:getMax(alldataset,variable)
	};
});


const propertiesTableAsli = {
	'cellspacing':0,
	'cellpadding':'5px',
	'border':1,
};

let dataTable = new Table(propertiesTableAsli);

let num = 1;

let tableHeader = [
	{content:'#'},
	{content:'Wilayah',attributes:{'style':'width:120px;'}},
];

variables.forEach((variable,idVar)=>{
	tableHeader.push({content:variable});
});

dataTable.addNewRow(tableHeader,false,'td');
alldataset.forEach((row,index)=>{

	// let target = '-';
	// if(targetDataset[row.tahun]){
	// 	target = (targetDataset[row.tahun][index].target) ? targetDataset[row.tahun][index].target.toFixed(2) : '-' ;
	// }

	
	const x1 = (row.X1) ? row.X1.toFixed(2) : '-';
	const x2 = (row.X2) ? row.X2.toFixed(2) : '-';
	const x3 = (row.X3) ? row.X3.toFixed(2) : '-';
	const x4 = (row.X4) ? row.X4.toFixed(2) : '-';
	const x5 = (row.X5) ? row.X5.toFixed(2) : '-';
	const x6 = (row.X6) ? row.X6.toFixed(2) : '-';
	const x7 = (row.X7) ? row.X7.toFixed(2) : '-';
	const t = (typeof row.target !== 'string') ? row.target.toFixed(2) : '-';

	let td_data = [
		{content:num++},
		{content:data_wilayah[row.wilayah],attributes:{class:'camel-case'}},
		{content:x1},
		{content:x2},
		{content:x3},
		{content:x4},
		{content:x5},
		{content:x6},
		{content:x7},
		{content:t}
	];
	dataTable.addNewRow(td_data,false,'td');
	
});

let td_min = [
	{content:'-'},
	{content:'min'},
	{content:dataSetMinMax.X1.min.toFixed(2)},
	{content:dataSetMinMax.X2.min.toFixed(2)},
	{content:dataSetMinMax.X3.min.toFixed(2)},
	{content:dataSetMinMax.X4.min.toFixed(2)},
	{content:dataSetMinMax.X5.min.toFixed(4)},
	{content:dataSetMinMax.X6.min.toFixed(4)},
	{content:dataSetMinMax.X7.min.toFixed(4)},
	{content:dataSetMinMax.target.min.toFixed(2)},
];
dataTable.addNewRow(td_min,false,'td');

let td_max = [
	{content:'-'},
	{content:'max'},
	{content:dataSetMinMax.X1.max.toFixed(2)},
	{content:dataSetMinMax.X2.max.toFixed(2)},
	{content:dataSetMinMax.X3.max.toFixed(2)},
	{content:dataSetMinMax.X4.max.toFixed(2)},
	{content:dataSetMinMax.X5.max.toFixed(2)},
	{content:dataSetMinMax.X6.max.toFixed(2)},
	{content:dataSetMinMax.X7.max.toFixed(2)},
	{content:dataSetMinMax.target.max.toFixed(2)},
];
dataTable.addNewRow(td_max,false,'td');

export const inputPrediksi = dataTable;



const propertiesTableNormalisasi = {
	'cellspacing':0,
	'cellpadding':'5px',
	'border':1,
};

let dataTableNormalisasi = new Table(propertiesTableNormalisasi);

num = 1;

let tableHeaderNormalisasi = [
	{content:'#'}
];

variables.forEach((variable,idVar)=>{
	tableHeaderNormalisasi.push({content:variable});
});

dataTableNormalisasi.addNewRow(tableHeaderNormalisasi,false,'td');
alldataset.forEach((row,index)=>{

	const targetNormal = (row.target != '-') ? normalisasi(row.target,dataSetMinMax.target.min,dataSetMinMax.target.max).toFixed(4) : '-';

	let td_data = [
		{content:num++},
	];
	variables.forEach((variable,idVar)=>{
		if(variable != 'target'){
			td_data.push({content:normalisasi(row[variable],dataSetMinMax[variable].min,dataSetMinMax[variable].max).toFixed(4)});
		}
	});
	td_data.push({content:targetNormal});

	dataTableNormalisasi.addNewRow(td_data,false,'td');
	
});


export const hasilNormaliasi = dataTableNormalisasi;