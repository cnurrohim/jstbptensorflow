import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuTraining.js';
import {variables,jmlTargetJST} from '../Data/DataMaster.js';
import {Table} from '../Lib/Table.js';

import {
	getStorage, 
	setStorage, 
	settingTrainingStorage,
	usedSettingTrainingStorage
} from '../Lib/Storage.js';
	
createNav('Training');
createSubNav('Setting');

const settingTraining = getStorage(settingTrainingStorage);
const usedSettingTraining = getStorage(usedSettingTrainingStorage);

const setSetting_btn = document.querySelector('#set-setting');
setSetting_btn.addEventListener('click',async (e)=>{
	e.preventDefault();
	
	const arsitekturJST = variables.length+' '+document.getElementById('hiddenNeuron').value+' '+jmlTargetJST;

	const dataItem = {
        hiddenNeuron: document.getElementById('hiddenNeuron').value,
        learningrate: document.getElementById('learningrate').value,
        maxepoch: document.getElementById('maxepoch').value,
        arsitekturJST: arsitekturJST
     }

    settingTraining.push(dataItem);
    setStorage(settingTrainingStorage,settingTraining);
	document.querySelector('#alert').innerHTML = 'berhasil disimpan';
	window.location.reload();
});

const tableProperties = {
	'cellspacing':0
};

const dataTable = new Table(tableProperties);
const headerPropterties = {
		'class':'font_pairs font_accents lighter cl_accents'
};

const header = ['#','Arsitektur JST','Learning Rate','Max Epoch','use'];
dataTable.addNewRow(header,false,'th',headerPropterties);

dataTable.setEmptyData(settingTraining);

const bodyProperties = {
	'class' : 'cl_tertiary'
}
settingTraining.forEach((setting,index)=>{
	const input = {
			tag:'input',
			attributes:{
				'type':'radio',
				'name':'setting-options',
				'data-id':index,
				'class':'pickOne'
			}
	}

	const listSetting = [
		{content:(index+1)},
		{content:setting.arsitekturJST},
		{content:setting.learningrate},
		{content:setting.maxepoch},
		{content:input}
	];
	
	dataTable.addNewRow(listSetting,false,'td',bodyProperties);
});


dataTable.displayTable('#list-setting');


const pickCheckboxs = document.querySelectorAll('.pickOne');
pickCheckboxs.forEach( function(pickCheckbox, index) {
  pickCheckbox.addEventListener('click',async (e)=>{

	const picked_dataID = Number(pickCheckbox.getAttribute('data-id'));
    setStorage(usedSettingTrainingStorage,picked_dataID);
    window.location.reload();
  });
});

const hiddenNeuron = document.querySelector('#hiddenNeuron');
hiddenNeuron.addEventListener('change', (e)=>{
	e.preventDefault();
	const arsitekturJST = variables.length+' '+document.getElementById('hiddenNeuron').value+' '+jmlTargetJST;
	document.getElementById('arsitekturJST').value = arsitekturJST
});

if(usedSettingTraining || usedSettingTraining == 0){
	const usedSetting = settingTraining[usedSettingTraining];
	document.getElementById('hiddenNeuron').value = usedSetting.hiddenNeuron;
	document.getElementById('learningrate').value = usedSetting.learningrate;
	document.getElementById('maxepoch').value = usedSetting.maxepoch;
	document.getElementById('arsitekturJST').value = usedSetting.arsitekturJST;
	const el = document.querySelector('input[data-id="'+usedSettingTraining+'"');
	el.checked = true;
}