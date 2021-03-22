import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPengujian.js';
import {variables,jmlTargetJST} from '../Data/DataMaster.js';
import {Table} from '../Lib/Table.js';

import {
	getStorage, 
	setStorage, 
	settingTrainingStorage,
	usedSettingPengujianStorage,
	trainingResultStorage
} from '../Lib/Storage.js';
	
createNav('Pengujian');
createSubNav('Setting');

const settingTraining = getStorage(settingTrainingStorage);
let usedSettingPengujian = getStorage(usedSettingPengujianStorage);
const trainingResults = getStorage(trainingResultStorage);

const tableProperties = {
	'cellspacing':0
};

const dataTable = new Table(tableProperties);

const header = ['#','Arsitektur JST','Learning Rate','MSE','EPOCH','use'];
dataTable.addNewRow(header,false);

dataTable.setEmptyData(settingTraining);

settingTraining.forEach((setting,index)=>{
	
	const results = trainingResults.find((result)=>{
		return result.idSetting == index;
	});

	
	const mse = (results) ? Number(results.mse).toFixed(9) : '-' ;
	const epoch = (results) ? results.epoch : '-' ;

	let input = {};
	if(results){
		input = {
			tag:'input',
			attributes:{
				'type':'checkbox',
				'name':'setting-options',
				'data-id':index,
				'class':'pickOne'
			}
		}
	}
	const listSetting = [
		{content:(index+1)},
		{content:setting.arsitekturJST},
		{content:setting.learningrate},
		{content:mse},
		{content:epoch},
		{content:input}
	];
	
	dataTable.addNewRow(listSetting,false);
});

dataTable.displayTable('#list-setting');


const pickCheckboxs = document.querySelectorAll('.pickOne');
pickCheckboxs.forEach( function(pickCheckbox, index) {
  pickCheckbox.addEventListener('click',async (e)=>{

  	const is_checked = pickCheckbox.checked;
	const picked_dataID = Number(pickCheckbox.getAttribute('data-id'));

  	if(is_checked !== true){
      usedSettingPengujian = usedSettingPengujian.filter( item => item != Number(picked_dataID) );
    }

  	if(is_checked == true){
		usedSettingPengujian.push(picked_dataID);
  	}

	setStorage(usedSettingPengujianStorage,usedSettingPengujian);
    window.location.reload();
  });
});

// TAMPILKAN BOBOT TENSORFLOW & BIAS TENSORFLOW
usedSettingPengujian.forEach( async function(id, index) {
	const el = document.querySelector('input[data-id="'+id+'"');
	el.checked = true;

    const modelName = 'model_no_'+id
	const modelUrl = 'localstorage://'+modelName;
	const model = await tf.loadLayersModel(modelUrl);
	
	let string = '';
    
    // need rework, idsetting harusnya ada di settingtraining bukan dengan index
    const pickedTraining = settingTraining[id];

    const topology = pickedTraining.arsitekturJST.split(" ").map((layer)=>{
    	return Number(layer);
  	});

	for (let i = 0; i < topology.length - 1; i++) {
		string += model.layers[i].getWeights()[0].shape;
		string += '<br/>';
		string += model.layers[i].getWeights()[0];
		string += '<br/>';
		string += model.layers[i].getWeights()[1];
		string += '<br/>';
	}

	document.querySelector('#infoBobot').innerHTML = '<pre>'+string+'</pre>';
});