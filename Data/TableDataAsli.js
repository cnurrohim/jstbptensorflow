import {Table} from '../Lib/Table.js';
import {dataset,tahunDataSet,targetDataset,variables} from './DataMaster.js';
import {data_wilayah} from './JS/dataWilayah.js';


const propertiesTableAsli = {
	'class':'datapick'
};

let dataTable = new Table(propertiesTableAsli);

let iteration = 0;
dataset.forEach((dataPerTahun,idtahun)=>{

	const rowProperties1 = {
		'class':'cl_accents no-select select-head head-'+tahunDataSet[idtahun],
		'data-id':tahunDataSet[idtahun]
	}

	const tableHeaderAsli = [
		{
			content:'Data Tahun '+tahunDataSet[idtahun],
			attributes: {
				'colspan':variables.length+3,
				class: 'ft_size_content font_pairs font_accents lighter toggleClassHidden head-'+tahunDataSet[idtahun],
				'data-id':tahunDataSet[idtahun]
			}
		}
	];


	let tableHeader2 = [
		//{content:'#'},
		{content:'Wilayah',attributes:{}}
	];

	variables.forEach((variable)=>{
		tableHeader2.push({content:variable});
	});
	tableHeader2.push({content:'target'});

	const hidden = (iteration == 0) ? '': 'hidden' ;
	iteration++;
	const rowProperties2 = {
		'class':'ft_size_xs font_pairs font_accents lighter cl_secondary '+hidden+' body-'+tahunDataSet[idtahun]
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
			//{content:index+1},
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

