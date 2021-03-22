import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPrediksi.js';
import {Table} from '../Lib/Table.js';

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
	tahunDataSet,
	completeDataSet,
	dataWilayah,
} from '../Data/DataMaster.js';

const dataInputPrediksi = getStorage(dataInputPrediksiStorage);

console.log(completeDataSet);
console.log(dataInputPrediksi);

const propertiesTableAsli = {
	'cellspacing':0,
	'class':''
};

const idwilayah = [...Array(38).keys()];
const idtahun1 = [0,1,2,3,4];
const idtahun2 = [0,1,2];

console.log(idwilayah);

let dataTable = new Table(propertiesTableAsli);

let num = 1;

let tableHeader = [
	{content:'#'},
	{content:'2019'},
	{content:'2020'},
	{content:'2021'}
];

dataTable.addNewRow(tableHeader,false,'td');

function kataKata(id,data,dataS){
	const indeksKesehatanLama = (dataS.target-20) / (85-20);
	const indeksKesehatan = (data.target-20) / (85-20);
	let string = '';
	string +=`Kabupaten ${dataWilayah[id+1]} <br/>`;
	string +=`a. Persentase keluhan kesehatan penduduk <br/>`;
    string +=`berubah dari ${dataS.X1} ke ${data.X1} atau meningkat ${ (((data.X1-dataS.X1)/data.X1)*100).toFixed(2) }% <br/>`;
	string +=`b. Presentase sanitasi layak rumah tangga <br/>`;
	string +=`berubah dari ${dataS.X2} ke ${data.X2} atau meningkat ${ (((data.X2-dataS.X2)/data.X2)*100).toFixed(2) }% <br/>`;
	string +=`c. Akses sumber air minum layak <br/>`;
    string +=`berubah dari ${dataS.X3} ke ${data.X3} atau meningkat ${ (((data.X3-dataS.X3)/data.X3)*100).toFixed(2) }% <br/>`;
	string +=`d. Presentase penduduk miskin <br/>`;
    string +=`berubah dari ${dataS.X4} ke ${data.X4} atau meningkat ${ (((data.X4-dataS.X4)/data.X4)*100).toFixed(2) }% <br/>`;
	string +=`e. Rata-rata lama sekolah <br/>`;
	string +=`berubah dari ${dataS.X5} ke ${data.X5} atau meningkat ${ (((data.X5-dataS.X5)/data.X5)*100).toFixed(2) }% <br/>`;
	string +=`f. Angka kematian bayi <br/>`;
	string +=`berubah dari ${dataS.X6} ke ${data.X6} atau meningkat ${ (((data.X6-dataS.X6)/data.X6)*100).toFixed(2) }% <br/>`;
	string +=`g. Jumlah Puskesmas <br/>`;
	string +=`berubah dari ${dataS.X7} ke ${data.X7} atau meningkat ${ (((data.X7-dataS.X7)/data.X7)*100).toFixed(2) }% <br/>`;
	string +=`h. Indeks Kesehatan <br/>`;
	string +=`indeks kesehatan berubah dari ${indeksKesehatanLama.toFixed(4)} ke ${indeksKesehatan.toFixed(4)}<br/>`;

	//string += indeksKesehatan.toFixed(2);
	// string += data.target;
	return string;
}

idwilayah.forEach((idw,idwil)=>{
	let td_data = [
		{content:dataWilayah[idwil+1]},
		{content:kataKata(idwil,dataInputPrediksi[0][idw],completeDataSet[4][idw])},
		{content:kataKata(idwil,dataInputPrediksi[1][idw],dataInputPrediksi[0][idw])},
		{content:kataKata(idwil,dataInputPrediksi[2][idw],dataInputPrediksi[1][idw])}
	];
	
	dataTable.addNewRow(td_data,false,'td');
});

dataTable.displayTable(".data-table");