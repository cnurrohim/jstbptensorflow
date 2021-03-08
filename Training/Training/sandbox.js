import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuTraining.js';
import {variables,jmlTargetJST,targetJST} from '../../Data/DataMaster.js';
import NeuralNetwork from '../../Lib/NeuralNetwork.js';
import NN from '../../Lib/NN.js';
import Matrix from '../../Lib/Matrix.js';

import {
  getStorage, 
  setStorage, 
  dataTrainingStorage,
  tahunTrainingStorage,
  settingTrainingStorage,
  hasilTrainingStorage,
  bobotTrainingStorage
} from '../../Lib/Storage.js';

createNav('Training');
createSubNav('Training');

let settingTraining = getStorage(settingTrainingStorage);
let bobotTraining = getStorage(bobotTrainingStorage);

const idSetting = settingTraining.length-1;
settingTraining = settingTraining[idSetting];
bobotTraining = bobotTraining.find((bobotBobot)=>{
  return bobotBobot.idSetting == idSetting;
});


if(Object.keys(bobotTraining).length > 0){
  Object.keys(bobotTraining).map((jenisBobot)=>{
    Object.keys(bobotTraining[jenisBobot]).map((key)=>{
      bobotTraining[jenisBobot][key] = new Matrix(
          bobotTraining[jenisBobot][key].rows,
          bobotTraining[jenisBobot][key].cols,
          bobotTraining[jenisBobot][key].matrix
        );
    });
  });

}

const plot = document.querySelector('#plot');

const btn_startTraining = document.querySelector('#startTraining');

btn_startTraining.addEventListener('click',(e)=>{
  e.preventDefault();
  btn_startTraining.classList.toggle('hidden');
  btn_stopTraining.classList.toggle('hidden');
  
  
  Plotly.purge('plot');
  train();
  
});

const layout = {
  xaxis: {
      title: {
        text: 'Epoch',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      range: [1,4],
    },
    yaxis: {
      title: {
        text: 'Mean Square Error (MSE)',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      range:[0.00, 1.00]
    }
};

let trace = {
  x: [1, 2, 3, 4],
  y: [0.5, 0.5, 0.5, 0.5]
};

const data = [trace];

Plotly.newPlot('plot', data, layout);

let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
];

const nn = new NN();
nn.setLearningRate(0.1);
nn.setWeights(bobotTraining.bobotNguyen);
nn.setBiases(bobotTraining.bias);

async function train(){
  
    let mse = 1;
    let sampleCount = 0; 
    while(iter < 200000) {
      

      /* UNTUK TES XOR */
      const randomIndex = getRandomInt(0, training_data.length-1);
      const dataX = training_data[randomIndex];
      const errorOutput = nn.train(dataX.inputs, dataX.outputs);
      /* UNTUK TES XOR */
      


      sampleCount += errorOutput.length;

      
      const totalErrorOutput = errorOutput.reduce((totalError, error)=>{
        return totalError + Math.pow(error,2)
      },0);

      errorAkumulasi += totalErrorOutput;
      
      mse = (errorAkumulasi/sampleCount);

      if(iter==1){
        await Plotly.plot('plot', [{
              y: [mse],
              x: [iter]
          }]
        );
        await delay();
      }else if(iter % 1000 == 0){
        await extend(iter,mse);
        await delay();
      }

      iter++;
    }
  

  console.log('0 = ');
  console.log(nn.predict([0,0]));
  console.log('1 = ');
  console.log(nn.predict([0,1]));
  console.log('1 = ');
  console.log(nn.predict([1,0]));
  console.log('0 = ');
  console.log(nn.predict([1,1]));
    

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function extend(x,y){
  Plotly.extendTraces('plot', {
    y: [[y]],
    x: [[x]]
  }, [0]);
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, -1000));
}