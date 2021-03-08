import {
	getStorage,
	setStorage,
	hasilPrediksiStorage,
	tahunPrediksiStorage,
	usedSettingPrediksiStorage
} from '../../Lib/Storage.js';

import {Table} from '../../Lib/Table.js';


import {clusterColor} from '../../Data/DataMaster.js';
import {data_wilayah} from '../../Data/JS/dataWilayah.js';

const hasilPrediksi = getStorage(hasilPrediksiStorage);
const tahunPrediksi = getStorage(tahunPrediksiStorage);
const usedSettingPrediksi = getStorage(usedSettingPrediksiStorage);

if(Object.keys(hasilPrediksi).length > 0  && Object.keys(tahunPrediksi).length > 0){
	const mainContainer = document.querySelector('.main-container');
	const hasilContainer = document.createElement('div');
	hasilContainer.classList.add('sub-container');
	mainContainer.appendChild(hasilContainer);

	const tableHasilProperties = {
		'cellspacing':0,
		'cellpadding':'5px',
		'border':1
	};


	tahunPrediksi.forEach((tahun,i)=>{
		const containerTableTahunPrediksi = document.createElement('div');
		containerTableTahunPrediksi.classList.add('table-'+tahun);
		containerTableTahunPrediksi.classList.add('table-group');
		containerTableTahunPrediksi.classList.add('toggle-visible');
		containerTableTahunPrediksi.classList.add('hidden');

		const LabelTableTahunPrediksi = document.createElement('P');
		LabelTableTahunPrediksi.innerHTML = 'Hasil Prediksi Tahun '+tahun;
		containerTableTahunPrediksi.appendChild(LabelTableTahunPrediksi);

		const HR = document.createElement('HR');
		containerTableTahunPrediksi.appendChild(HR);

		hasilContainer.appendChild(containerTableTahunPrediksi);

		clusters.forEach((cluster)=>{
			
			const containerTableHasilPrediksi = document.createElement('div');
			containerTableHasilPrediksi.classList.add('table-'+tahun+'-cluster-'+cluster);
			containerTableHasilPrediksi.classList.add('cluster-group');
			containerTableTahunPrediksi.appendChild(containerTableHasilPrediksi);

			const tableHasilPrediksi = new Table(tableHasilProperties);
			const tableHeader = [
				{content:'#'},
				{content:'Cluster:'},
				{content: (cluster+1),attributes:{class:clusterColor[cluster]}}
			];

			tableHasilPrediksi.addNewRow(tableHeader,false);

			const listCluster = hasilPrediksi.filter((hasil)=>{
				return hasil.cluster == cluster && hasil.idSetting == usedSettingPrediksi && hasil.tahunData == tahun;
			});


			listCluster.forEach((list,index)=>{
				
				const td_data = [
					{content:index+1},
					{content:data_wilayah[list.idWilayah],attributes:{colspan:2}},
				];

				tableHasilPrediksi.addNewRow(td_data,false);
			});

			tableHasilPrediksi.displayTable('.table-'+tahun+'-cluster-'+cluster);
		});
	});


	const toggleVisible = document.querySelector('.togglehasilPrediksi');
	toggleVisible.addEventListener('click',(e)=>{
		
		e.preventDefault();

		const targetElements = document.querySelectorAll('.toggle-visible');
		targetElements.forEach((targetElement)=>{
			targetElement.classList.toggle('hidden');
		});
	});
}