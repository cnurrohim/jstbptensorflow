import {Table} from '../Lib/Table.js';
import {
	tahunDataSet,
	dataset,
	data_TerNormalisasi,
	dataTargetMinMax,
	targetDataset,
	variables
} from './DataMaster.js';

const properties = {
	'class':'datapick'
};

let dataTable = new Table(properties);

let iteration = 0;
data_TerNormalisasi.forEach((dataPerTahun,idtahun)=>{

	const checkAll = {
		tag:'input',
		attributes: {
			type: 'checkbox',
			'data-id': tahunDataSet[idtahun],
			class:'pickAll'
		}
	}

	const rowProperties1 = {
		'class':'cl_accents no-select select-head head-'+tahunDataSet[idtahun],
		'data-id':tahunDataSet[idtahun]
	}

	const tableHeader = [
		{
			content:'Normalisasi',
			attributes: {
				'colspan':variables.length+1,
				class: 'ft_size_content font_pairs font_accents lighter toggleClassHidden head-'+tahunDataSet[idtahun],
				'data-id':tahunDataSet[idtahun]
			}
		},
		{
			content:checkAll,
			attributes:{
				class:'pick'
			}
		}
	];


	let tableHeader2 = [];

	variables.forEach((variable)=>{
		tableHeader2.push({content:variable});
	});
	tableHeader2.push({content:'target'});
	tableHeader2.push({content:'pilih'});

	const hidden = (iteration == 0) ? '': 'hidden' ;
	iteration++;
	const rowProperties2 = {
		'class':'ft_size_xs font_pairs font_accents lighter cl_secondary font_accents '+hidden+' body-'+tahunDataSet[idtahun]
	}

	dataTable.addNewRow(tableHeader,false,'td',rowProperties1);
	dataTable.addNewRow(tableHeader2,false,'td',rowProperties2);


	let input = {};
	let td_data = [];
	dataPerTahun.forEach((row,index)=>{
		input = {
			tag:'input',
			attributes:{
				'type':'checkbox',
				'data-id':tahunDataSet[idtahun]+"-"+row.wilayah,
				'data-value':row.X1+','+row.X2+','+row.X3+','+row.X4+','+row.X5,
				'data-reg':row.wilayah,
				'class':'id-'+tahunDataSet[idtahun]+'-'+row.wilayah+' data-'+tahunDataSet[idtahun]+' pickOne'
			}
		}
		
		let target = '-';

		if(targetDataset[idtahun]){
			target = targetDataset[idtahun][index].targetNormalisasi[0].toFixed(2);
		}

		td_data = [];

		variables.forEach((variable)=>{
			td_data.push({content:row[variable].toFixed(4)});
		});
		td_data.push({content:target});
		td_data.push({content:input});

		dataTable.addNewRow(td_data,false,'td',rowProperties2);
	});
});

export const dataTableNormalisasi = dataTable;
