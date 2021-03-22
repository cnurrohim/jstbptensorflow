import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuTraining.js';

import {
        getStorage,
        setStorage,
        dataTrainingStorage,
        tahunTrainingStorage
      } from '../Lib/Storage.js';
  
import {dataTableAsli} from '../Data/TableDataAsli.js';
import {dataTableNormalisasi} from '../Data/TableDataNormalisasi.js';
import {getFiturFromData,dataSetMatrix,tahunDataSet} from '../Data/DataMaster.js';


dataTableAsli.displayTable(".data-table");
dataTableNormalisasi.displayTable(".data-table-normalisasi");

createNav('Training');
createSubNav('Data Per Tahun');

let trainingData = getStorage(dataTrainingStorage);
let tahunTraining = getStorage(tahunTrainingStorage);


trainingData.forEach( function(tahunData, index) {
  if(tahunData.length > 0){
    tahunData.forEach((data)=>{
      const el = document.querySelector('.id-'+data.tahunData+'-'+data.idWilayah);
      el.checked = true;
    });
  }
});
 


tahunTraining.forEach( function(element, index) {
  const el = document.querySelector('input[data-id="'+element+'"');
  el.checked = true;
});


const pickAllCheckboxes = document.querySelectorAll('.pickAll');
pickAllCheckboxes.forEach( function(pickAllCheckbox, index) {
  pickAllCheckbox.addEventListener('click',async (e)=>{
    
    //e.preventDefault();
    const is_checked = pickAllCheckbox.checked;

    const data_id = pickAllCheckbox.getAttribute('data-id');
    
    tahunTraining.push(Number(data_id));
    tahunTraining = [...new Set(tahunTraining)];
    tahunTraining.sort();

    
    if(is_checked !== true){
      tahunTraining = tahunTraining.filter( item => item != Number(data_id) );
    }
    
    const emptyTrainingData = [];
    const pickOneCheckBoxes = document.querySelectorAll('.pickOne');
    pickOneCheckBoxes.forEach( function(pickOneCheckBox, ind) {
      const pickOne_dataID = pickOneCheckBox.getAttribute('data-id');
      
      if(pickOne_dataID.split('-')[0] == data_id){
        pickOneCheckBox.checked = is_checked;
      }
      
      const idTahun = tahunTraining.findIndex((tahunData)=>{
        return tahunData == pickOne_dataID.split('-')[0];
      });

      emptyTrainingData[idTahun] = (typeof emptyTrainingData[idTahun] == 'undefined') ? [] : emptyTrainingData[idTahun];
      
      if(pickOneCheckBox.checked == true){
        const fitur = getFiturFromData(pickOne_dataID,dataSetMatrix,tahunDataSet);
        emptyTrainingData[idTahun].push(fitur);
      }
      
    });
    

    const filtered = emptyTrainingData.filter((data)=>{return data.length > 0});
    


    setStorage(dataTrainingStorage,filtered);
    setStorage(tahunTrainingStorage,tahunTraining);
  });
});

const pickCheckboxs = document.querySelectorAll('.pickOne');
pickCheckboxs.forEach( function(pickCheckbox, index) {
  pickCheckbox.addEventListener('click',async (e)=>{
    const is_checked = pickCheckbox.checked;

    
    const picked_dataID = pickCheckbox.getAttribute('data-id');

    tahunTraining.push(Number(picked_dataID.split('-')[0]));
    tahunTraining = [...new Set(tahunTraining)];
    tahunTraining.sort();

    // if(is_checked !== true){
    //   tahunTraining = tahunTraining.filter( item => item != Number(picked_dataID.split('-')[0]) );
    // }
    
    let emptyTrainingData = [];
    const trainingDataCount = [];
    const pickOneCheckBoxes = document.querySelectorAll('.pickOne');
    pickOneCheckBoxes.forEach( function(pickOneCheckBox, ind) {
      const pickOne_dataID = pickOneCheckBox.getAttribute('data-id');
  
      const idTahun = tahunTraining.findIndex((tahunData)=>{
        return tahunData == pickOne_dataID.split('-')[0];
      });

      
      if(idTahun >= 0){

        emptyTrainingData[idTahun] = (typeof emptyTrainingData[idTahun] == 'undefined') ? [] : emptyTrainingData[idTahun];
        trainingDataCount[idTahun] = (typeof trainingDataCount[idTahun] == 'undefined') ? 0 : trainingDataCount[idTahun];
        
        if(pickOneCheckBox.checked == true){
          trainingDataCount[idTahun]++;
          const fitur = getFiturFromData(pickOne_dataID,dataSetMatrix,tahunDataSet);
          emptyTrainingData[idTahun].push(fitur);
        }
      }
      
    });

    tahunTraining = tahunTraining.filter((tahun,index)=>{
      return trainingDataCount[index] > 0;
    });

    emptyTrainingData = emptyTrainingData.filter((dataPerTahun,index)=>{
      return dataPerTahun.length > 0;
    });
    
    
    setStorage(dataTrainingStorage,emptyTrainingData);
    setStorage(tahunTrainingStorage,tahunTraining);
  });
});

const toggleHiddenObjects = document.querySelectorAll('.toggleClassHidden');
toggleHiddenObjects.forEach( function(toggle, index) {
  toggle.addEventListener('click',async (e)=>{
      
      const data_id = toggle.getAttribute('data-id');
      const hiddenElements = document.querySelectorAll('.body-'+data_id);
      
      hiddenElements.forEach( function(hiddenELement, ind) {
        hiddenELement.classList.toggle('hidden');
      });
  });
});

const tHidden = document.querySelectorAll('.toggle-label');
tHidden.forEach( function(element, index) {
  element.addEventListener('click', (e)=>{

    t = element.parentNode.querySelector('.toggle-hidden');
    t.classList.toggle('hidden');
      
  });
});
