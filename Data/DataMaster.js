// peserta didik
// import {data_2014} from './JS/2014.js';
// import {data_2015} from './JS/2015.js';
// import {data_2016} from './JS/2016.js';
// import {data_2017} from './JS/2017.js';
// import {data_2018} from './JS/2018.js';

// rata-rata lama sekolah
// import {data_2014} from './JS/RLS_2014.js';
// import {data_2015} from './JS/RLS_2015.js';
// import {data_2016} from './JS/RLS_2016.js';
// import {data_2017} from './JS/RLS_2017.js';
// import {data_2018} from './JS/RLS_2018.js';

// 7 VAR
import {data_2014} from './JS/7VAR_2014.js';
import {data_2015} from './JS/7VAR_2015.js';
import {data_2016} from './JS/7VAR_2016.js';
import {data_2017} from './JS/7VAR_2017.js';
import {data_2018} from './JS/7VAR_2018.js';
import {data_wilayah} from './JS/dataWilayah.js';

import {target_2014} from './JS/targetAHH_2014.js';
import {target_2015} from './JS/targetAHH_2015.js';
import {target_2016} from './JS/targetAHH_2016.js';
import {target_2017} from './JS/targetAHH_2017.js';
import {target_2018} from './JS/targetAHH_2018.js';

import Matrix from '../Lib/Matrix.js';

export const variables = ['X1','X2','X3','X4','X5','X6','X7'];
export const variableTitles = [
	'Persentase Penduduk yang Mempunyai Keluhan Kesehatan dan Berobat Jalan Selama Sebulan Terakhir',
	'Persentase Rumah Tangga yang Memiliki Akses Terhadap Sanitasi Layak',
	'Akses Terhadap Sumber Air Minum Layak',
	'Presentase Penduduk Miskin',
	'Rata-Rata Lama Sekolah',
	'Angka Kematian Bayi',
	'Banyaknya Puskesmas'
];

export const variableTitlesPendek = [
	'Persentase Keluhan Kesehatan Penduduk',
	'Persentase Sanitasi Layak RT',
	'Akses Sumber Air Minum Layak',
	'Presentase Penduduk Miskin',
	'Rata-Rata Lama Sekolah',
	'Angka Kematian Bayi',
	'Banyaknya Puskesmas'
];

export const variableTitlesSuperPendek = [
	'Keluhan Kesehatan Penduduk',
	'Sanitasi Layak RT',
	'Air Minum Layak',
	'Penduduk Miskin',
	'Rata-Rata Lama Sekolah',
	'Angka Kematian Bayi',
	'Banyaknya Puskesmas'
];

export const variableTarget = [
	'target'
];

export const variableTargetTitles = [
	'Angka Harapan Hidup'
];

export const targetTitles = [
	'Angka Harapan Hidup'
];

export const prediksiTitles = [
	'Indeks Kesehatan'
];

export const targetDataset = [target_2014,target_2015,target_2016,target_2017,target_2018];
export const allTargetDataset = [...target_2014,...target_2015,...target_2016,...target_2017,...target_2018];
export const tahunTargetDataSet = [2014,2015,2016,2017,2018];

export const tahunDataSet = [2014,2015,2016,2017,2018];
export const dataset = [data_2014,data_2015,data_2016,data_2017,data_2018];

export const tahunPrediksiSet = [2019,2020,2021];
export const prediksiset = [data_2018,data_2018,data_2018];

const dataClone = JSON.parse(JSON.stringify(data_2017));
const dataClone1 = JSON.parse(JSON.stringify(data_2018));

const dataClone2 = JSON.parse(JSON.stringify(data_2018));
const dataClone3 = JSON.parse(JSON.stringify(data_2018));
const dataClone4 = JSON.parse(JSON.stringify(data_2018));


function randomPenambah(randomNum,randomNum2){
	const penambah = [];
	dataClone1.forEach((data,idWilayah)=>{
		let num1 = 0;
		let num2 = 0;
		let num3 = 0;
		let num4 = 0;
		let num5 = 0;
		let num6 = 0;
		let num7 = 0;
		if(data.X1 - dataClone[idWilayah].X1 > 0 ){
			num1 = Math.random() * (randomNum - 1) + 1;
			num1 = Math.round(num1 * 100) / 100;
		}else{
			num1 = Math.random() * ((-randomNum) - (-1)) + (-1);
			num1 = Math.round(num1 * 100) / 100;
		}

		if(data.X2 - dataClone[idWilayah].X2 > 0 ){
			num2 = Math.random() * (randomNum - 1) + 1;
			num2 = Math.round(num2 * 100) / 100;
		}else{
			num2 = Math.random() * ((-randomNum) - (-1)) + (-1);
			num2 = Math.round(num2 * 100) / 100;
		}

		if(data.X3 - dataClone[idWilayah].X3 > 0 ){
			num3 = Math.random() * (randomNum - 1) + 1;
			num3 = Math.round(num3 * 100) / 100;
		}else{
			num3 = Math.random() * ((-randomNum) - (-1)) + (-1);
			num3 = Math.round(num3 * 100) / 100;
		}

		if(data.X4 - dataClone[idWilayah].X4 > 0 ){
			num4 = Math.random() * (randomNum - 1) + 1;
			num4 = Math.round(num4 * 100) / 100;
		}else{
			num4 = Math.random() * ((-randomNum) - (-1)) + (-1);
			num4 = Math.round(num4 * 100) / 100;
		}

		if(data.X5 - dataClone[idWilayah].X5 > 0 ){
			num5 = Math.random() * (randomNum2 - 1) + 1;
			num5 = Math.round(num5 * 100) / 100;
		}else{
			num5 = Math.random() * ((-randomNum2) - (-1)) + (-1);
			num5 = Math.round(num5 * 100) / 100;
		}

		if(data.X6 - dataClone[idWilayah].X6 > 0 ){
			num6 = Math.random() * (randomNum2 - 1) + 1;
			num6 = Math.round(num6 * 100) / 100;
		}else{
			num6 = Math.random() * ((-randomNum2) - (-1)) + (-1);
			num6 = Math.round(num6 * 100) / 100;
		}

		
		num7 = Math.random() * (1 - 0) + 0;
		num7 = Math.round(num7 * 100 / 100);

		penambah[idWilayah] = {X1:num1,X2:num2,X3:num3,X4:num4,X5:num5,X6:num6,X7:num7};
	});

	return penambah;

}

const randomNum = Math.random() * (7 - 1) + 1;
const randomNum2 = Math.random() * (3 - 1) + 1;
let penambah = randomPenambah(randomNum,randomNum2);

dataClone2.forEach((data,idWilayah)=>{
	variables.forEach((variable)=>{
		if(variable != 'X7'){
			dataClone2[idWilayah][variable] = Math.round( (dataClone1[idWilayah][variable] + ((penambah[idWilayah][variable] / 100) * dataClone1[idWilayah][variable])) * 100) / 100;
		}else if(variable == 'X7'){
			dataClone2[idWilayah][variable] = (dataClone1[idWilayah][variable] + penambah[idWilayah][variable]);
		}
	});
});

const randomN = Math.random() * (7 - 1) + 1;
const randomN2 = Math.random() * (3 - 1) + 1;
penambah = randomPenambah(randomN,randomN2);

dataClone3.forEach((data,idWilayah)=>{
	variables.forEach((variable)=>{
		if(variable != 'X7'){
			dataClone3[idWilayah][variable] = Math.round( (dataClone2[idWilayah][variable] + ((penambah[idWilayah][variable] / 100) * dataClone2[idWilayah][variable])) * 100) / 100;
		}else if(variable == 'X7'){
			dataClone3[idWilayah][variable] = (dataClone2[idWilayah][variable] + penambah[idWilayah][variable]);
		}
	});
});

const randomNm = Math.random() * (7 - 1) + 1;
const randomNm2 = Math.random() * (3 - 1) + 1;
penambah = randomPenambah(randomNm,randomNm2);

dataClone4.forEach((data,idWilayah)=>{
	variables.forEach((variable)=>{
		if(variable != 'X7'){
			dataClone4[idWilayah][variable] = Math.round( (dataClone3[idWilayah][variable] + ((penambah[idWilayah][variable] / 100) * dataClone3[idWilayah][variable])) * 100) / 100;
		}else if(variable == 'X7'){
			dataClone4[idWilayah][variable] = (dataClone3[idWilayah][variable] + penambah[idWilayah][variable]);
		}
	});
});



export const prediksisetRandom = [dataClone2,dataClone3,dataClone4];


// prediksisetRandom.forEach((dataTahun,index)=>{
// 	dataTahun.forEach((data,indexData)=>{
// 		variables.forEach((X)=>{
// 			prediksisetRandom[index][indexData][X] = Number((data[X]+(Math.random()*(5-1)+1)).toFixed(2));
// 		});
// 	});
// });

// export const prediksiSetRandom = prediksisetRandom;


export const alldataset = [...data_2014,...data_2015,...data_2016,...data_2017,...data_2018];
export const jmlTargetJST = 1;
export const kategoriTarget = {0:'Rendah',1:'Sedang',2:'Tinggi',3:'Sangat Tinggi'};
export const jmlKategori = Object.keys(kategoriTarget).length;
export const clusterColor = { 0:'red',1:'yellow',2:'green', 3:'blue'};
export const dataWilayah = data_wilayah;

const completeSet = [];

dataset.forEach((dataPerTahun,indexTahun)=>{
	completeSet[indexTahun] = [];
	completeSet[indexTahun].push(...dataPerTahun);
	dataPerTahun.forEach((dataPerWilayah,indexWilayah)=>{
		completeSet[indexTahun][indexWilayah].target = targetDataset[indexTahun][indexWilayah].target;
	});
});

export const completeDataSet = completeSet;


let dataSetMinMax = {};

variables.forEach((variable,index)=>{
	dataSetMinMax[variable] = {
		min:getMin(alldataset,variable),
		max:getMax(alldataset,variable)
	};
});

let targetSetMinMax = {};
variableTarget.forEach((variable,index)=>{
	targetSetMinMax[variable] = {
		min:getMin(allTargetDataset,variable),
		max:getMax(allTargetDataset,variable)
	};
});

const skalaIndeks =[
	{
		min:0,
		max:0.5,
		predikat:'rendah'
	},
	{
		min:0.5,
		max:0.7,
		predikat:'sedang'
	},
	{
		min:0.7,
		max:1,
		predikat:'tinggi'
	}
];


export const dataTargetMinMax = [];
targetDataset.forEach((dataPerTahun,tahun)=>{
	let a = {};

	const data = dataPerTahun.map((data)=>{
		return data.target;
	});


	const min = minOfArray(data);
	const max = maxOfArray(data);
	const rentang = (max-min) / jmlKategori;
	const batasRendah = min + rentang;
	const batasSedang = batasRendah + rentang;
	const batasTinggi = batasSedang + rentang;
	a = {
		tahun:tahunTargetDataSet[tahun],
		min:min,
		max:max,
		rentang: rentang,
		batasRendah: batasRendah,
		batasSedang: batasSedang,
		batasTinggi: batasTinggi
	};

	dataTargetMinMax.push(a);
});

targetDataset.forEach((dataPerTahun,index)=>{
	dataPerTahun.map((data)=>{
		
		variableTarget.forEach((variable,index)=>{
			const target = normalisasi(data.target,targetSetMinMax[variable].min,targetSetMinMax[variable].max);
			data.targetNormalisasi = [target];
		});
		
	});
});



let dataTerNormalisasi = [];
dataset.forEach((dataPerTahun,tahun)=>{
	dataTerNormalisasi[tahun] = [];

	dataPerTahun.forEach((dataPerWilayah,i)=>{
		dataTerNormalisasi[tahun][i] = {
			wilayah: dataPerWilayah.wilayah
		};

		variables.forEach((variable,index)=>{
			dataTerNormalisasi[tahun][i][variable] =
			normalisasi(dataPerWilayah[variable],dataSetMinMax[variable].min,dataSetMinMax[variable].max);
		});

	});
});


export const dataSetMatrix = [];
dataTerNormalisasi.forEach((dataPerTahun,indexTahun)=>{
	dataSetMatrix[indexTahun] = [];
	dataPerTahun.forEach((data,index)=>{

		const target = (targetDataset[indexTahun]) ? targetDataset[indexTahun][index].targetNormalisasi  : '-';

		const allVarValue = [];
		variables.forEach((variable)=>{
			allVarValue.push(data[variable]);
		});


		const fitur = Matrix.fromArray(allVarValue,1,variables.length);
		const dataMatrix = {
			tahunData:tahunDataSet[indexTahun],
			idWilayah:data.wilayah,
			nilaiFitur: fitur,
			target:target
		}
		dataSetMatrix[indexTahun].push(dataMatrix);

	});
});

export const dataSet_MinMax = dataSetMinMax;
export const data_TerNormalisasi = dataTerNormalisasi;

export function getPredikatTingkatKesehatan(nilaiIndeks){
	const predikat = skalaIndeks.find((skala,index)=>{
		return nilaiIndeks <= skala.max
	});

	return predikat;
}

export function normalisasi(nilaiAsli,min,max){
	return (nilaiAsli-min)/(max-min);
}

export function denormalisasi(nilaiAsli,min,max){
	return (nilaiAsli * (max-min)) + min;
}

export function minOfArray(dataset){
	const min = dataset.reduce((currentMin,data)=>{
		return (data < currentMin) ? data : currentMin;
	},1000000);

	return min;
}

export function maxOfArray(dataset){
	const max = dataset.reduce((currentMax,data)=>{
		return (data > currentMax) ? data : currentMax;
	},-100);

	return max;
}

export function getMin(dataSet,variable){
	const min = dataSet.reduce((currentMin,data)=>{	
		return (data[variable]<currentMin) ? data[variable] : currentMin;
	},1000000);
	
	return min;	
}

export function getMax(dataSet,variable){
	const max = dataSet.reduce((current,data)=>{	
		return (data[variable] > current) ? data[variable] : current;
	},0);

	return max;
}

export function getKeyByValue(object, value) {
 	return Object.keys(object).find(key => object[key] === value);
}

export function getDetailWilayahByIdWilayah(data_wilayah,id_wilayah){
 	const key = Object.keys(data_wilayah).find(key => data_wilayah[key].wilayah == id_wilayah);
 	return data_wilayah[key];
}

export function getKategoriHasil(output,targetMinMax){
	let kategori = kategoriTarget[0];
	if(output > targetMinMax.batasRendah){
		kategori = kategoriTarget[1];
	}

	if(output > targetMinMax.batasSedang){
		kategori = kategoriTarget[2];
	}

	return kategori;
}

export function getIdWarnaHasilDenormalisasi(output,targetMinMax){
	let warna = 0;
	if(output > targetMinMax.batasRendah){
		warna = 1;
	}

	if(output > targetMinMax.batasSedang){
		warna = 2;
	}

	return warna;
}

export function getFiturFromData(id,data,tahun){
	const idTahun = tahun.findIndex((tahunData)=>{
		return tahunData == id.split('-')[0];
	});


	const fitur = data[idTahun].find((data)=>{
		return data.idWilayah == id.split('-')[1];
	});

	return fitur;
}

export function getFitur(id){
	const idTahun = tahunDataSet.findIndex((tahunData)=>{
		return tahunData == id.split('-')[0];
	});
	
	const setDataPerWilayah = dataTerNormalisasi[idTahun].find((data)=>{
		return data.wilayah == id.split('-')[1];
	});

	
	let fitur = [];
	variables.forEach((variable)=>{
		fitur.push(setDataPerWilayah[variable]);
	});

	
	return fitur;
}