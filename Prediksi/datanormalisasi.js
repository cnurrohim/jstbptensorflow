import {createNav} from '../Menu/Menu.js';
import {createSubNav} from '../Menu/MenuPrediksi.js';

import {
        getStorage,
        setStorage,
        dataPrediksiStorage,
        dataInputPrediksiStorage,
        tahunPrediksiStorage
      } from '../Lib/Storage.js';

import {prediksiset,tahunPrediksiSet,variables} from '../Data/DataMaster.js';
import {data_wilayah} from '../Data/JS/dataWilayah.js';
import {inputPrediksi,hasilNormaliasi} from './TableInputNormalisasi.js';
import {getFiturFromData,dataSetMatrix,tahunDataSet} from '../Data/DataMaster.js';

inputPrediksi.displayTable(".data-table");
hasilNormaliasi.displayTable(".data-table-normalisasi");

createNav('Prediksi');
createSubNav('Hasil Normalisasi');