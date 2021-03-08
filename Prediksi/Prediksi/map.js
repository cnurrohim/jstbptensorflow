import {
    getStorage,
    setStorage,
    hasilPrediksiStorage,
    tahunPrediksiStorage,
    usedSettingPrediksiStorage,
    dataInputPrediksiStorage,
} from '../../Lib/Storage.js';

import {
    tahunDataSet,
    getKeyByValue,
    getDetailWilayahByIdWilayah,
    dataset,
    clusterColor,
    variableTitlesSuperPendek,
    variables
} from '../../Data/DataMaster.js';

import {data_wilayah} from '../../Data/JS/dataWilayah.js';
import {addText,changeMapRegionColor,delay} from '../../Lib/map.js';

const tahunPrediksi = getStorage(tahunPrediksiStorage);
const hasilPrediksi = getStorage(hasilPrediksiStorage);
const usedSettingPrediksi = getStorage(usedSettingPrediksiStorage);
let PrediksiData = getStorage(dataInputPrediksiStorage);

let alltahun = [...tahunDataSet, ...tahunPrediksi];
let alldataset = [...dataset,...PrediksiData];

window.addEventListener("load", function() {

    alltahun.forEach((tahun,i)=>{

        var svgObject = document.getElementById('svg-map-'+tahun).contentDocument;

        var paths = svgObject.querySelectorAll("path");
        
        paths.forEach((region)=>{

                
            const idWilayah = region.getAttribute('data-region');
            
            if(idWilayah && typeof idWilayah != 'null'){

                addText(region,idWilayah);

                const keyWilayah = Number(getKeyByValue(data_wilayah, idWilayah.toLowerCase()));
                const detailWilayah = getDetailWilayahByIdWilayah(alldataset[i],keyWilayah);
                
                let p = '<b>'+idWilayah+'</b><hr/><br/>';
                variables.forEach((variable,idVar)=>{
                    p += variableTitlesSuperPendek[idVar]+': '+detailWilayah[variable]+'<br/>';
                });
                region.setAttribute('data-info',p);


                if(Object.keys(hasilPrediksi).length > 0  && Object.keys(tahunPrediksi).length > 0 && usedSettingPrediksi != null){
                    const dataWilayah = hasilPrediksi.find((hasil)=>{
                        return hasil.idWilayah === keyWilayah && hasil.idSetting == usedSettingPrediksi && hasil.tahunData == tahun;
                    });

                    
                    if(typeof dataWilayah != 'undefined'){
                        changeMapRegionColor(dataWilayah.tahunData,dataWilayah.idWilayah,dataWilayah.cluster);
                    }
                }

            }

            if(region.getAttribute('data-info')){
                region.addEventListener("mouseover", (e)=>{
                    document.querySelector('#info-box').style.display = 'block'
                    document.querySelector('#info-box').innerHTML = region.getAttribute('data-info')

                    document.querySelector('#info-box').style.top = (e.pageY-100)+'px'
                    document.querySelector('#info-box').style.left = (e.pageX+100)+'px'

                });

                region.addEventListener("mouseleave", (e)=>{
                    document.querySelector('#info-box').style.display = 'none'
                });
            }
        });


        var style = svgObject.createElementNS("http://www.w3.org/2000/svg", "style");

        // Now (ab)use the @import directive to load make the browser load our css
        style.textContent = '@import url("../Assets/map.css");';

        var svgElem = svgObject.querySelector('svg');
        svgElem.insertBefore(style, svgElem.firstChild);

    });



});