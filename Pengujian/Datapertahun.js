import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPengujian.js';

import {
        getStorage,
        setStorage,
        dataPengujianStorage,
        tahunPengujianStorage
      } from '../Lib/Storage.js';
  
import {dataTableAsli} from '../Data/TableDataAsli.js';
import {dataTableNormalisasi} from '../Data/TableDataNormalisasi.js';
import {getFiturFromData,dataSetMatrix,tahunDataSet} from '../Data/DataMaster.js';


createNav('Pengujian');
createSubNav('Data Per Tahun');

let PengujianData = getStorage(dataPengujianStorage);
let tahunPengujian = getStorage(tahunPengujianStorage);

dataTableAsli.displayTable(".data-table");
dataTableNormalisasi.displayTable(".data-table-normalisasi");


PengujianData.forEach( function(tahunData, index) {
  if(tahunData.length > 0){
    tahunData.forEach((data)=>{
      const el = document.querySelector('.id-'+data.tahunData+'-'+data.idWilayah);
      el.checked = true;
    });
  }
});
 

tahunPengujian.forEach( function(element, index) {
  const el = document.querySelector('input[data-id="'+element+'"');
  el.checked = true;
});


const pickAllCheckboxes = document.querySelectorAll('.pickAll');
pickAllCheckboxes.forEach( function(pickAllCheckbox, index) {
  pickAllCheckbox.addEventListener('click',async (e)=>{
    
    //e.preventDefault();
    const is_checked = pickAllCheckbox.checked;

    const data_id = pickAllCheckbox.getAttribute('data-id');
    
    tahunPengujian.push(Number(data_id));
    tahunPengujian = [...new Set(tahunPengujian)];
    tahunPengujian.sort();

    if(is_checked !== true){
      tahunPengujian = tahunPengujian.filter( item => item != Number(data_id) );
    }
    
    const emptyPengujianData = [];
    const pickOneCheckBoxes = document.querySelectorAll('.pickOne');
    pickOneCheckBoxes.forEach( function(pickOneCheckBox, ind) {
      const pickOne_dataID = pickOneCheckBox.getAttribute('data-id');
      
      if(pickOne_dataID.split('-')[0] == data_id){
        pickOneCheckBox.checked = is_checked;
      }
      
      const idTahun = tahunPengujian.findIndex((tahunData)=>{
        return tahunData == pickOne_dataID.split('-')[0];
      });

      emptyPengujianData[idTahun] = (typeof emptyPengujianData[idTahun] == 'undefined') ? [] : emptyPengujianData[idTahun];
      
      if(pickOneCheckBox.checked == true){
        const fitur = getFiturFromData(pickOne_dataID,dataSetMatrix,tahunDataSet);
        emptyPengujianData[idTahun].push(fitur);
      }
      
    });
    

    const filtered = emptyPengujianData.filter((data)=>{return data.length > 0});
    
    setStorage(dataPengujianStorage,filtered);
    setStorage(tahunPengujianStorage,tahunPengujian);
  });
});

const pickCheckboxs = document.querySelectorAll('.pickOne');
pickCheckboxs.forEach( function(pickCheckbox, index) {
  pickCheckbox.addEventListener('click',async (e)=>{
    const is_checked = pickCheckbox.checked;

    
    const picked_dataID = pickCheckbox.getAttribute('data-id');

    tahunPengujian.push(Number(picked_dataID.split('-')[0]));
    tahunPengujian = [...new Set(tahunPengujian)];
    tahunPengujian.sort();

    // if(is_checked !== true){
    //   tahunPengujian = tahunPengujian.filter( item => item != Number(picked_dataID.split('-')[0]) );
    // }
    
    let emptyPengujianData = [];
    const PengujianDataCount = [];
    const pickOneCheckBoxes = document.querySelectorAll('.pickOne');
    pickOneCheckBoxes.forEach( function(pickOneCheckBox, ind) {
      const pickOne_dataID = pickOneCheckBox.getAttribute('data-id');
  
      const idTahun = tahunPengujian.findIndex((tahunData)=>{
        return tahunData == pickOne_dataID.split('-')[0];
      });

      
      if(idTahun >= 0){

        emptyPengujianData[idTahun] = (typeof emptyPengujianData[idTahun] == 'undefined') ? [] : emptyPengujianData[idTahun];
        PengujianDataCount[idTahun] = (typeof PengujianDataCount[idTahun] == 'undefined') ? 0 : PengujianDataCount[idTahun];
        
        if(pickOneCheckBox.checked == true){
          PengujianDataCount[idTahun]++;
          const fitur = getFiturFromData(pickOne_dataID,dataSetMatrix,tahunDataSet);
          emptyPengujianData[idTahun].push(fitur);
        }
      }
      
    });

    tahunPengujian = tahunPengujian.filter((tahun,index)=>{
      return PengujianDataCount[index] > 0;
    });

    emptyPengujianData = emptyPengujianData.filter((dataPerTahun,index)=>{
      return dataPerTahun.length > 0;
    });



    setStorage(dataPengujianStorage,emptyPengujianData);
    setStorage(tahunPengujianStorage,tahunPengujian);
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
