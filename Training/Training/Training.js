import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuTraining.js';
import {variables,jmlTargetJST} from '../../Data/DataMaster.js';


import {
  getStorage, 
  setStorage, 
  dataTrainingStorage,
  tahunTrainingStorage,
  settingTrainingStorage,
  hasilTrainingStorage,
  bobotTrainingStorage,
  usedSettingTrainingStorage,
  trainingResultStorage
} from '../../Lib/Storage.js';

createNav('Training');
createSubNav('Training');

let start = false;
let trainingData = getStorage(dataTrainingStorage);
let tahunTraining = getStorage(tahunTrainingStorage);

let hasilTraining = getStorage(hasilTrainingStorage);

let settingTraining = getStorage(settingTrainingStorage);
let bobotTraining = getStorage(bobotTrainingStorage);

let usedSetting = getStorage(usedSettingTrainingStorage);
let trainingResult = getStorage(trainingResultStorage);

let dataset = [];
let targetset = [];


if(trainingData.length == 0){
  const alert = document.createElement('p');
  alert.classList.add('alert');
  alert.innerHTML = 'Belum ada data untuk dilakukan training';
  const mc = document.querySelector('.main-container');
  mc.appendChild(alert);
  const forms = document.querySelectorAll('.sub-container');
  forms.forEach((form)=>{
    form.classList.add('hidden');
  })
}else{
  // randomize data
  trainingData.forEach((dataPerTahun,indexTahun)=>{
    dataPerTahun.forEach((dataPerWilayah,indexData)=>{
      // masih berbentuk matrix dari coding sebelumnya
      // next dihilangkan
      dataset.push(dataPerWilayah.nilaiFitur.matrix[0]);
      targetset.push(dataPerWilayah.target);
    });
  });
  
}



if(settingTraining.length == 0){
  const alert = document.createElement('p');
  alert.classList.add('alert');
  alert.innerHTML = 'Setting neural network belum dipilih';
  const mc = document.querySelector('.main-container');
  mc.appendChild(alert);
  const forms = document.querySelectorAll('.sub-container');
  forms.forEach((form)=>{
    form.classList.add('hidden');
  })
}else{

  const idSetting = usedSetting;
  settingTraining = settingTraining[idSetting];

  let info = '<p>Arsitektur JST: '+settingTraining.arsitekturJST+'</p>';
      info += '<p>Learning Rate: '+settingTraining.learningrate+'</p>';
  const infoArsitekturJST = document.querySelector('#info').innerHTML = info;


  const plot = document.querySelector('#plot');

  const btn_startTraining = document.querySelector('#startTraining');


  btn_startTraining.addEventListener('click',(e)=>{
    e.preventDefault();
    btn_startTraining.innerHTML = 'Ulangi Training';
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

  const topology = settingTraining.arsitekturJST.split(" ").map((layer)=>{
    return Number(layer);
  });

  const train_xs = tf.tensor(dataset);
  const train_ys = tf.tensor(targetset);

  const model = tf.sequential();

  topology.forEach( (units,index) => {

    if(index == 1){
      const hidden = tf.layers.dense({
        inputShape: [topology[0]],
        units:units,
        activation: 'sigmoid'
      });

      model.add(hidden);    
    }
    
    if(index > 1){
      const nextLayer = tf.layers.dense({
        units:units,
        activation: 'sigmoid'
      });

      model.add(nextLayer);
    }

    
  });

  const optimizer = tf.train.sgd(settingTraining.learningrate);

  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError',
    metrics: 'mse'
  });


  async function train(){
      let num_epochs = 0;
      let mse_loss = 0;
       const h = await model.fit(train_xs, train_ys, {
           suffle: true,
           epochs: settingTraining.maxepoch,
           validationSplit: 0.2,
           callbacks:[
              tf.callbacks.earlyStopping({monitor: 'val_acc'}),
              new tf.CustomCallback({
                onEpochEnd: async (epoch,logs) => {
                    if(epoch==0){
                      Plotly.plot('plot', [{
                            y: [logs.mse],
                            x: [epoch+1],
                            name: 'mse'
                        },{
                            y: [logs.val_loss ],
                            x: [epoch+1],
                            name:'val loss'
                        }]
                      );
                      
                    }else{
                      extend( (epoch+1),logs.loss,logs.val_loss);
                      
                    }

                    num_epochs = epoch+1;
                    mse_loss = logs.loss;
                }
              })
           ]

       });

       const modelName = 'model_no_'+idSetting
       await model.save('localstorage://'+modelName);

      document.querySelector('#infoMSE').innerHTML = '<p>MSE terkecil = '+mse_loss+'</p>';
      document.querySelector('#infoMSE').innerHTML += '<p>Epoch = '+(num_epochs)+'</p>';

      let newTrainingResult = trainingResult.filter((data,id)=>{
        return data.idSetting != usedSetting;
      });

      const result = {
        idSetting: idSetting,
        mse: mse_loss,
        epoch: num_epochs
      };


      newTrainingResult.push(result);

      setStorage(trainingResultStorage,newTrainingResult);
      let string = '';
      
      for (let i = 0; i < topology.length - 1; i++) {
        
        string += model.layers[i].getWeights()[0].shape;
        string += '<br/>';
        string += model.layers[i].getWeights()[0];
        string += '<br/>';
      }

      document.querySelector('#infoBobot').innerHTML = '<pre>'+string+'</pre>';
  }

  async function extend(x,y,z){
    Plotly.extendTraces('plot', {
      y: [[y],[z]],
      x: [[x],[x]]
    }, [0,1]);
  }

  function delay() {
    return new Promise(resolve => setTimeout(resolve, -1000));
  }

}