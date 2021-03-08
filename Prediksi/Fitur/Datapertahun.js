import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuPrediksi.js';

import {
        getStorage,
        setStorage,
        dataPrediksiStorage,
        dataInputPrediksiStorage,
        tahunPrediksiStorage,
        minMaxPrediksiStorage,
        prediksiNormalisasiStorage
      } from '../../Lib/Storage.js';

import {
        prediksiset,
        tahunPrediksiSet,
        variables,
        dataset,
        getMin,
        getMax,
        normalisasi,
        targetDataset,
        variableTitlesPendek
      } from '../../Data/DataMaster.js';
import {data_wilayah} from '../../Data/JS/dataWilayah.js';
import {inputPrediksi} from './TableInputPrediksi.js';
import {getFiturFromData,dataSetMatrix,tahunDataSet} from '../../Data/DataMaster.js';

// convert object into array
const arrayWilayah = Object.keys(data_wilayah).map((key)=>{
  return data_wilayah[key];
});

const arrayIDWilayah = Object.keys(data_wilayah).map((key)=>{
  return Number(key);
});

inputPrediksi.displayTable(".data-table");

createNav('Prediksi');
createSubNav('Data Per Tahun');

let PrediksiData = getStorage(dataPrediksiStorage);
let tahunPrediksi = getStorage(tahunPrediksiStorage);
let alltahun = [...tahunDataSet, ...tahunPrediksiSet];

const save = document.querySelector('#save');
save.addEventListener('click',async (e)=>{
    e.preventDefault();

    const dataPrediksi = [];
    const dataInputPrediksi = [];
    tahunPrediksiSet.forEach((tahun,indexTahun)=>{
      dataInputPrediksi[indexTahun] = [];
      arrayWilayah.forEach((wilayah,indexWilayah)=>{

        const nilaiFitur = [];
        const fiturPerVariable = {};
        fiturPerVariable.wilayah = (indexWilayah+1);
        variables.forEach((variable,idVar)=>{
          const fiturValue = document.querySelector(
            `.inputPrediksi[tahun-prediksi="${tahun}"][variable="${variable}"][wilayah="${(indexWilayah+1)}"]`
          ).value;

          nilaiFitur.push(Number(fiturValue));
          fiturPerVariable[variable] = Number(fiturValue);
        });
        
        
        dataPrediksi.push({
          "tahunData":tahun,
          "idWilayah":(indexWilayah+1),
          "nilaiFitur":nilaiFitur
        });

        dataInputPrediksi[indexTahun].push(fiturPerVariable);
      });

      
    });
    
    

    let datasetwithinputset = [...dataset,...dataInputPrediksi];
    let alldataset = [];

    

    datasetwithinputset.forEach((data,key)=>{ 
      data = data.map((record,idrecord)=>{
        record.tahun = alltahun[key];
        return record;
      });
      
      alldataset.push(...data);
    });

    let dataSetMinMax = [];
    variables.forEach((variable,index)=>{
      dataSetMinMax[variable] = {
        min:getMin(alldataset,variable),
        max:getMax(alldataset,variable)
      };
    });

    let dataPrediksiNormalisasi = [];
    dataInputPrediksi.forEach((dataPerTahun,indexTahun)=>{
      dataPrediksiNormalisasi[indexTahun] = [];
      dataPerTahun.forEach((data,indexRow)=>{
        let dataNormalisasi = {};
        variables.forEach((variable,index)=>{
          dataNormalisasi[variable] = normalisasi(data[variable],dataSetMinMax[variable].min,dataSetMinMax[variable].max);
        });
        dataNormalisasi.tahun = data.tahun;
        dataNormalisasi.wilayah = data.wilayah;
        dataPrediksiNormalisasi[indexTahun].push(dataNormalisasi);
      });
    });

    

    setStorage(minMaxPrediksiStorage,dataSetMinMax,false);
    setStorage(prediksiNormalisasiStorage,dataPrediksiNormalisasi);
    setStorage(dataInputPrediksiStorage,dataInputPrediksi);
    setStorage(dataPrediksiStorage,dataPrediksi);
    setStorage(tahunPrediksiStorage,tahunPrediksiSet);
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

function getdataPerVariable(wilayahInput,tahun){
  const dataPerVariable = [];
  variables.forEach( (variable,indexVar) => {
    const dataVariablePerTahun = {};
    arrayIDWilayah.forEach( (iDWilayah)=> {
      dataVariablePerTahun[iDWilayah] = {}
      dataVariablePerTahun[iDWilayah][variable] = [];
      dataset.forEach( (dataPerTahun,indexTahun) => {
        dataPerTahun.forEach( (data,indexTahun) => {
          if(data.wilayah == iDWilayah){
            dataVariablePerTahun[iDWilayah][variable].push(data[variable]);
          }      
        });
      });
    });
    
    dataPerVariable.push(dataVariablePerTahun);
  });

  variables.forEach( (variable,indexVar) => {

    const inputPrediksiManual = document.querySelectorAll(`input[wilayah="${wilayahInput}"][variable="${variable}"]`);
    
    inputPrediksiManual.forEach( (input)=>{
      dataPerVariable[indexVar][wilayahInput][variable].push(Number(input.value));
    });
  });

  return dataPerVariable; 
}

// fungsi saat klik input text
const allInputElements = document.querySelectorAll('.inputPrediksi');
allInputElements.forEach( (input,indexInput)=>{
  input.addEventListener('click',refreshPlot,false);
  input.addEventListener('change',refreshPlot,false);
});


function inputPersenEventHandler(e){
  const target = this.getAttribute('data-target');
  const tahunPrediksi = this.getAttribute('tahun-prediksi');
  const wilayah = this.getAttribute('wilayah');
  const indexVariable = this.getAttribute('index-var');

  const dataPerVariable = getdataPerVariable(wilayah,tahunPrediksi);

  const persen = this.value;

  

  const tahunSebelumnya = alltahun.findIndex((tahun)=>{
      return tahun == Number(tahunPrediksi)-1;
  });
  

  
  
  const nilaiSebelumnya = dataPerVariable[indexVariable][wilayah][variables[indexVariable]][tahunSebelumnya];
  const penambahan = nilaiSebelumnya + (persen/100 * nilaiSebelumnya);
  
  document.querySelector('.'+target).value = penambahan;
  document.querySelector('.'+target).dispatchEvent(new Event("change"));
}

function refreshPlot(){
  const plot = document.querySelector('#plot');
  plot.innerHTML = '';
  const input = this;
   const tahunInput = input.getAttribute('tahun-prediksi');
   const wilayahInput = input.getAttribute('wilayah');
   const dataPerVariable = getdataPerVariable(wilayahInput,tahunInput);
   
   variables.forEach( (variable,indexVar) => {
    
    const tahunSebelumnya = alltahun.findIndex((tahun)=>{
      return tahun == Number(tahunInput)-1;
    });
    

    printPlot(variable,alltahun,dataPerVariable[indexVar][wilayahInput][variable],variableTitlesPendek[indexVar],tahunInput,wilayahInput);

    const nilaiSebelumnya = dataPerVariable[indexVar][wilayahInput][variable][tahunSebelumnya];
    const nilaiSekarang = dataPerVariable[indexVar][wilayahInput][variable][tahunSebelumnya+1]; 
    
    inputPersen(nilaiSebelumnya,nilaiSekarang,tahunInput,wilayahInput,indexVar);

   });
}

function inputPersen(nilaiSebelumnya,nilaiSekarang,tahunInput,wilayahInput,indexVar){

  const persenTambahan = ((nilaiSekarang-nilaiSebelumnya)/nilaiSebelumnya)*100;  
  const input = document.createElement('input');
  
  input.setAttribute('data-target', "id-"+tahunInput+"-"+wilayahInput+'-'+indexVar);
  input.setAttribute('tahun-prediksi', tahunInput);
  input.setAttribute('wilayah', wilayahInput);
  input.setAttribute('index-var', indexVar);

  input.setAttribute('style', 'width:50px');
  input.setAttribute('class', 'input-persen');
  input.addEventListener('change', inputPersenEventHandler, false);
  input.value = Number(persenTambahan.toFixed(2));
  const plot = document.querySelector('#plot');
  let p = document.createElement('span');
  p.innerHTML = "Selisih dengan tahun sebelumnya sebesar ";
  plot.appendChild(p);
  plot.appendChild(input);
  p = document.createElement('span');
  p.innerHTML = " % <hr/><br/>";
  plot.appendChild(p);
}

function printPlot(variable,alltahun,dataPerVariable,variableTitlesPendek,tahun,idwilayah){
  const title = document.createElement('p');
  title.innerHTML = variableTitlesPendek+' '+arrayWilayah[idwilayah-1]+' tahun '+tahun;

  const plot = document.querySelector('#plot');
  const newPlot = document.createElement('div');
  newPlot.setAttribute('id', 'plot-'+variable);
  newPlot.setAttribute('class', 'plotBox');
  plot.appendChild(title);
  plot.appendChild(newPlot);

   var layout = {
      width: 400,
      height: 200,
      margin: {
        l: 50,
        r: 0,
        b: 20,
        t: 0
      }
    };

  let trace = {
    x: alltahun,
    y: dataPerVariable
  };

  const data = [trace];

  Plotly.newPlot('plot-'+variable, data,layout);
}