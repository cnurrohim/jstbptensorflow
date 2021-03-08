import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuTraining.js';
import {Table} from '../../Lib/Table.js';
import Matrix from '../../Lib/Matrix.js';

import {
	getStorage, 
	setStorage,
	settingBobotTrainingStorage,
	bobotTrainingStorage,
	settingTrainingStorage,
	usedSettingTrainingStorage
} from '../../Lib/Storage.js';
	
createNav('Training');
createSubNav('Bobot');

const settingBobotTraining = getStorage(settingBobotTrainingStorage);
const bobotTraining = getStorage(bobotTrainingStorage);
let settingTraining = getStorage(settingTrainingStorage);
const usedSettingTraining = getStorage(usedSettingTrainingStorage);

if(settingTraining.length == 0 || usedSettingTraining == null){
	const alert = document.createElement('p');
	alert.classList.add('alert');
	alert.innerHTML = 'Arsitektur/Model JST belum dipilih';
	const mc = document.querySelector('.main-container');
	mc.appendChild(alert);
	const form = document.querySelector('#setting-container');
	form.classList.add('hidden');
}else{

const idSetting = usedSettingTraining;
settingTraining = settingTraining[idSetting];

let bobotAcak = [];
let bobotNguyen = [];
let biasAcak = [];
let usedBobot = [];
let usedBobotSetting = null;
document.querySelector('#arsitektur').innerHTML = settingTraining.arsitekturJST;

if(bobotTraining.length > 0){
	usedBobot = bobotTraining.find((bobot)=>{
	  return bobot.idSetting == idSetting;
	});
}


if(settingBobotTraining != null){
	usedBobotSetting = settingBobotTraining.find((setting)=>{
	  return setting.idSetting == idSetting;
	});
}


if(typeof usedBobot != 'undefined' && Object.keys(usedBobot).length > 0){
	const nodes = settingTraining.arsitekturJST.split(" ");
	nodes.forEach((node,index)=>{
		const min = usedBobotSetting.minInterval;
		const max = usedBobotSetting.maxInterval;
		const jumlahInput =  Number(node);
		const jumlahOutput = Number(nodes[index+1]);
		
		const bobot = usedBobot.bobotAsli[index];
		showWeight(bobot,node,nodes,index,false);

		document.getElementById('minInterval').value = usedBobotSetting.minInterval;
		document.getElementById('maxInterval').value = usedBobotSetting.maxInterval;
	})
}


const setBobot_btn = document.querySelector('#set-bobot');
setBobot_btn.addEventListener('click',async (e)=>{
	e.preventDefault();
	
	const dataInterval = {
		idSetting: idSetting,
        minInterval: document.getElementById('minInterval').value,
        maxInterval: document.getElementById('maxInterval').value
     }

     const dataBobot = {
        idSetting: idSetting,
        bobotAsli: bobotAcak,
        bobotNguyen: bobotNguyen,
        bias: biasAcak
     }

    
    const bobotTrainingFiltered = bobotTraining.filter((bobot)=>{
	  return bobot.idSetting != idSetting;
	});


    let settingBobotTrainingFiltered = [];
    if(settingBobotTraining != null){
		settingBobotTrainingFiltered = settingBobotTraining.filter((setting)=>{
			return setting.idSetting != idSetting;
		});
    }

    settingBobotTrainingFiltered.push(dataInterval);
    bobotTrainingFiltered.push(dataBobot);
    
    setStorage(settingBobotTrainingStorage,settingBobotTrainingFiltered);
    setStorage(bobotTrainingStorage,bobotTrainingFiltered);

	document.querySelector('#alert').innerHTML = 'berhasil disimpan';
});

const acakBobot_btn = document.querySelector('#acak-bobot');
acakBobot_btn.addEventListener('click',async (e)=>{
	const min = parseFloat(document.querySelector('#minInterval').value);
	const max = parseFloat(document.querySelector('#maxInterval').value);

	if(!min || !max){
		alert = document.querySelector('.alert');
		alert.style.display = 'block';
		alert.classList.toggle('alert-danger')	
		alert.innerHTML = 'interval belum diisi';
		return false;
	}

	const nodes = settingTraining.arsitekturJST.split(" ");
	
	nodes.forEach((node,index)=>{
		if(typeof nodes[index+1] != 'undefined'){
			const jumlahInput =  Number(node);
			const jumlahOutput = Number(nodes[index+1]);

			bobotAcak[index] = acakBobot(jumlahInput,jumlahOutput,min,max);
			showWeight(bobotAcak[index],node,nodes,index,true);
		}
	})
});


function showWeight(bobotAcak,node,nodes,index,acak = true){
	if(nodes[index+1]){
		const jumlahInput =  Number(node);
		const jumlahOutput = Number(nodes[index+1]);
		const last = (!nodes[index+2]) ? true : false ;
		
		// setStorage(usedBobotStorage,bobotAcak);
		let bobotTampil = fixedPoint(bobotAcak,2);
		tampilkanBobot(bobotTampil,index,last);	

		
		const vektorV = hitunganV(bobotTampil,index);
		tampilkanHitunganV(bobotTampil,index);	
		tampilkanHitunganFaktorSkalaTerbesar(jumlahInput,jumlahOutput,index);	
		
		const beta = Number((0.7 * Math.pow(jumlahOutput,(1/jumlahInput))).toFixed(2));
		
		
		tampilkanHitunganNguyen(bobotTampil,index,beta,vektorV);	
		bobotNguyen[index] = hitungBobotNguyen(bobotTampil,index,beta,vektorV);

		if(acak){
			biasAcak[index] = acakBobot(1,jumlahOutput,-beta,beta);
			biasAcak[index] = fixedPoint(biasAcak[index],4);
		}else{
			biasAcak[index] = usedBobot.bias[index];
		}

		tampilkanBias(biasAcak[index],index,-beta,beta);


		
		
	}
}

function tampilkanHitunganFaktorSkalaTerbesar(unitMasukan,unitKeluaran,index){
	const betta = Number((0.7 * Math.pow(unitKeluaran,(1/unitMasukan))).toFixed(2));
	const faktorSkalaTerbesar = 'Faktor Skala Terbesar = 0.7 ('+unitMasukan+' &radic; '+unitKeluaran+') = '+betta;
	const p = document.createElement('p');
	p.innerHTML = faktorSkalaTerbesar+' <br/><br/> <b>inisialisasi dengan algoritma nguyen widrow </b>';
	const q = document.querySelector('.data-table-'+index);
	q.appendChild(p);
}

function tampilkanHitunganV(weights,index){
	weights = Matrix.transpose(weights);
	
	let totalVString = [];
	weights.matrix.forEach((weight,iWeight)=>{	
		let t = 0;
		let s = '';
		s += '|| V'+(iWeight+1)+' || = &radic;(';

		weight.forEach((w)=>{
			t += Math.pow(w,2);
			s += w+'^2 + ';
		});

		s = s.substring(0, s.length - 3);
		s += ') = '+Math.sqrt(t)+'</p>';

		totalVString[iWeight] = s;
		const p = document.createElement('p');
		p.innerHTML = s;
		const q = document.querySelector('.data-table-'+index);
		q.appendChild(p);
	});
	return totalVString;
}

function hitunganV(weights,index){
	weights = Matrix.transpose(weights);
	let totalV = [];
	weights.matrix.forEach((weight,iWeight)=>{
		totalV[iWeight] = 0;
		weight.forEach((w)=>{
			totalV[iWeight] += Math.pow(w,2);
		});
		totalV[iWeight] = Math.sqrt(totalV[iWeight]);
	});

	return totalV;
}

function hitungBobotNguyen(bobot,index,beta,v){
	
	let bobotNguyen = new Matrix(bobot.rows,bobot.cols);

	bobot.matrix.forEach((bobotPerKelas,index)=>{
		bobotPerKelas = bobotPerKelas.map((bobot,i)=>{
			bobotNguyen.matrix[index][i] = Number(((beta.toFixed(2)*bobot) / v[i]).toFixed(4));
		});
	});

	
	return bobotNguyen;
}
function tampilkanHitunganNguyen(bobot,index,beta,v){
	
	const tableProperties = {
		'cellspacing':0,
		'cellpadding':'5px',
		'border':1
	};


	const dataTable = new Table(tableProperties);
	bobot.matrix.forEach((bobotPerKelas,index)=>{
		bobotPerKelas = bobotPerKelas.map((bobot,i)=>{
			return '( '+beta.toFixed(2)+'* '+bobot+') / '+v[i].toFixed(2)+' <br/> = '+((beta.toFixed(2)*bobot) / v[i]).toFixed(4);
		});
		dataTable.addNewRow(bobotPerKelas,false);
	});

	const t = dataTable.getTable();
	const div = document.querySelector('.data-table-'+index);
	div.appendChild(t);
}


function tampilkanBias(bobot,index,min,max){
	const tableProperties = {
		'cellspacing':0,
		'cellpadding':'5px',
		'border':1
	};

	const dataTable = new Table(tableProperties);

	bobot.matrix.forEach((bobotPerKelas,index)=>{
		dataTable.addNewRow(bobotPerKelas,false);
	});

	const p = document.createElement('p');
	p.innerHTML = 'Bias yang dipakai sebagai inisialisasi adalah bilangan acak antara '+min+' dan '+max;
	const div = document.querySelector('.data-table-'+index);
	
	div.appendChild(p);

	const t = dataTable.getTable();
	div.appendChild(t);
}

function tampilkanBobot(bobot,index,last){
	const tableProperties = {
		'cellspacing':0,
		'cellpadding':'5px',
		'border':1
	};

	const dataTable = new Table(tableProperties);

	bobot.matrix.forEach((bobotPerKelas,index)=>{
		dataTable.addNewRow(bobotPerKelas,false);
	});

	
	const div = document.createElement('div');
	div.classList.add('data-table-'+index);
	const mainContainer = document.querySelector('.data-table-group');
	mainContainer.appendChild(div);

	const divt = document.querySelector('.data-table-'+index);
	divt.innerHTML = '';

	const p = document.createElement('p');
	if(index == 0){
		p.innerHTML = '<b>Inisialisasi bobot dari layer input ke layer tersembunyi '+(index+1)+' </b><hr/>';
	}else{
		p.innerHTML = '<br/><b>Inisialisasi bobot dari layer tersembunyi '+index+' ke layer tersembunyi '+(index+1)+'</b><hr/>';
	}

	
	if(last) {
		p.innerHTML = '<br/><b>Inisialisasi bobot dari layer tersembunyi '+index+' ke layer output</b><hr/>';
	}
	
	divt.appendChild(p);

	const t = dataTable.getTable();
	divt.appendChild(t);
}


function acakBobot(jumlahInput,jumlahOutput,min,max){
	let matrix = new Matrix(jumlahInput,jumlahOutput);
	for(let row = 0; row < matrix.rows; row++){
		for(let col = 0; col < matrix.cols; col++){
			let hasilAcak = (Math.random() * (max - min) + min);
			matrix.matrix[row][col] = Number(hasilAcak);
		}
	}

	return matrix;
}

function fixedPoint(matrix,point){
	let newMatrix = new Matrix(matrix.rows,matrix.cols);
	for(let r = 0; r < newMatrix.rows; r++){
		for(let c = 0; c < newMatrix.cols; c++){
			newMatrix.matrix[r][c] = Number(matrix.matrix[r][c].toFixed(point));
		}
	}
	return newMatrix;
}
}