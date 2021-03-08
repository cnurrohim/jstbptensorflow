import {Table} from '../Lib/Table.js';
import {dataset,tahunDataSet,targetDataset,variables} from './DataMaster.js';
import {data_wilayah} from './JS/dataWilayah.js';


const propertiesTableAsli = {
	'cellspacing':0,
	'cellpadding':'5px',
	'border':0,
	'class':'datapick'
};

let dataTable = new Table(propertiesTableAsli);

dataset.forEach((dataPerTahun,idtahun)=>{

	const rowProperties1 = {
		'class':'no-select select-head head-'+tahunDataSet[idtahun],
		'data-id':tahunDataSet[idtahun]
	}

	const tableHeaderAsli = [
		{
			content:'Data Tahun '+tahunDataSet[idtahun],
			attributes: {
				'colspan':variables.length+3,
				class: 'toggleClassHidden head-'+tahunDataSet[idtahun],
				'data-id':tahunDataSet[idtahun]
			}
		}
	];


	let tableHeader2 = [
		{content:'#'},
		{content:'Wilayah',attributes:{'style':'width:250px;'}}
	];

	variables.forEach((variable)=>{
		tableHeader2.push({content:variable});
	});
	tableHeader2.push({content:'target'});

	const rowProperties2 = {
		'class':'hidden body-'+tahunDataSet[idtahun]
	}

	dataTable.addNewRow(tableHeaderAsli,false,'td',rowProperties1);
	dataTable.addNewRow(tableHeader2,false,'td',rowProperties2);


	let td_data = [];
	dataPerTahun.forEach((row,index)=>{

		let target = '-';
		if(targetDataset[idtahun]){
			target = (targetDataset[idtahun][index].target) ? targetDataset[idtahun][index].target.toFixed(2) : '-' ;
		}

		td_data = [
			{content:index+1},
			{content:data_wilayah[row.wilayah],attributes:{class:'camel-case'}},
		];

		variables.forEach((variable)=>{
			td_data.push({content:row[variable]});
		});
		td_data.push({content:target});

		dataTable.addNewRow(td_data,false,'td',rowProperties2);
	});
});


export const dataTableAsli = dataTable;

