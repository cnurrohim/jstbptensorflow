import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuPrediksi.js';
import {variables,jmlTargetJST} from '../../Data/DataMaster.js';
import {Table} from '../../Lib/Table.js';

import {
	getStorage, 
	setStorage, 
	settingTrainingStorage,
	usedSettingPrediksiStorage,
	trainingResultStorage
} from '../../Lib/Storage.js';
	
createNav('Prediksi');
createSubNav('Setting');

const settingTraining = getStorage(settingTrainingStorage);
let usedSettingPrediksi = getStorage(usedSettingPrediksiStorage);
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
				'type':'radio',
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

 
	const picked_dataID = Number(pickCheckbox.getAttribute('data-id'));
	setStorage(usedSettingPrediksiStorage,picked_dataID);
    window.location.reload();
  });
});

if(usedSettingPrediksi || usedSettingPrediksi == 0){
	const el = document.querySelector('input[data-id="'+usedSettingPrediksi+'"');
	el.checked = true;
}