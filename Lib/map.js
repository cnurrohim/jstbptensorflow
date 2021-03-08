export function addText(p,text){
    let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let b = p.getBBox()
    let x = b.x + (b.width/2)
    let y = b.y + (b.height/2)
    if(text == "Magetan"){ x = b.x + 15; y = b.y + (b.height/2) + 15 }
    if(text == "Madiun"){ x = b.x + 40; y = b.y + (b.height/2) + 50 }
    if(text == "Kediri"){ x = b.x + 140; y = b.y + (b.height/2) + 50 }
    if(text == "Ponorogo"){ x = b.x + 70; y = b.y + (b.height/2) - 20 }
    if(text == "Trenggalek"){ x = b.x + 70; y = b.y + (b.height/2) - 20}
    if(text == "Tulungagung"){x = b.x + 20; y = b.y + (b.height/2) + 50 }
    if(text == "Blitar"){ x = b.x + 100; y = b.y + (b.height/2) + 50 }
    if(text == "Nganjuk"){ x = b.x + 60; y = b.y + (b.height/2) - 10 }
    if(text == "Jombang"){ x = b.x + 60; y = b.y + (b.height/2) - 10 }
    if(text == "Mojokerto"){ x = b.x + 40; y = b.y + (b.height/2) + 50 }
    if(text == "Sidoarjo"){ x = b.x + 140; y = b.y + (b.height/2) }
    if(text == "Kota Pasuruan"){x = b.x + 25; y = b.y + (b.height/2) - 10 }
    if(text == "Kota Probolinggo"){ x = b.x + 25; y = b.y + (b.height/2) - 20}
    if(text == "Probolinggo"){ x = b.x + 150; y = b.y + (b.height/2) + 10 }
    if(text == "Bangkalan"){ x = b.x + 70; y = b.y + (b.height/2) }
    if(text == "Sampang"){ x = b.x + 60; y = b.y + (b.height/2) }
    if(text == "Pamekasan"){x = b.x + 20; y = b.y + (b.height/2) + 10 }
    if(text == "Situbondo"){x = b.x + 250; y = b.y + (b.height/2) + 10 }
    if(text == "Bondowoso"){ x = b.x + 80; y = b.y + (b.height/2) }
    if(text == "Banyuwangi"){ x = b.x + 100; y = b.y + (b.height/2) }
    if(text == "Malang"){x = b.x + 150; y = b.y + (b.height/2) + 50}
    if(text == "Gresik"){x = b.x + 60; y = b.y + (b.height/2) + 15 }

    t.setAttribute("transform", "translate(" + (x) + " " + (y) + ")")

    t.textContent = text
    t.setAttribute("fill", "#000000")
    t.setAttribute("font-size", "1em")
    t.setAttribute("display", "block")
    t.setAttribute("toggleText", true)
    t.setAttribute("pointer-events", "none")
    p.parentNode.insertBefore(t, p.nextSibling)
}

import {data_wilayah} from '../Data/JS/dataWilayah.js';
import {clusterColor,targetTitles,prediksiTitles} from '../Data/DataMaster.js';

export function changeMapRegionColor(tahunData,idWilayah,cluster,newParameter){
    const namawilayah = data_wilayah[idWilayah];
    const NamaWilayah = namawilayah
                    .toLowerCase()
                    .split(' ')
                    .map(   (string)=>{
                        return string.charAt(0).toUpperCase() + string.substring(1)
                    }).join(' ');
    
    var svgObject = document.getElementById('svg-map-'+tahunData).contentDocument;
    var RegionPath = svgObject.querySelector("[data-region='"+NamaWilayah+"']");
    var dataInfo = RegionPath.getAttribute('data-info');

    var newDataInfo = dataInfo + targetTitles+": "+newParameter[0]+"<br/>";
    newDataInfo += prediksiTitles+": "+newParameter[1]+"<br/>";

    RegionPath.setAttribute('data-info',newDataInfo);
    RegionPath.setAttribute('class',clusterColor[cluster]);
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}