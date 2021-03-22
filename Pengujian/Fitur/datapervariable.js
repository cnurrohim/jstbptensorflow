import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuPengujian.js';

import {Table} from '../../Lib/Table.js';
import {variables,variableTitles,dataset,tahunDataSet} from '../../Data/DataMaster.js';
import {data_wilayah} from '../../Data/JS/dataWilayah.js';
import {data_2014} from '../../Data/JS/2014.js';
import {data_2015} from '../../Data/JS/2015.js';
import {data_2016} from '../../Data/JS/2016.js';
import {data_2017} from '../../Data/JS/2017.js';
import {data_2018} from '../../Data/JS/2018.js';

const tableProperties = {
	'cellspacing':0
};

const trProperties = {
	'class':'no-select select-head '
}

createNav('Pengujian');
createSubNav('Data Per Variable');

variables.forEach((variable,index)=>{
	const dataTable = new Table(tableProperties);

	let tableTitle = [
		{
			content: 'X'+(index+1)+': '+variableTitles[index],
			attributes:{
				colspan:6,
				class:'toggleClassHidden head-'+variable,
				'data-id':variable
			}
		}
	];

	dataTable.addNewRow(tableTitle,false,'td',trProperties);

	let tableHeader = [{content:'Wilayah'}];

	dataset.forEach((dataPerTahun,tahunIndex)=>{
		tableHeader.push({content:tahunDataSet[tahunIndex]});
	});

	let rowProperties = {
		'class':'hidden body-'+variable
	}

	dataTable.addNewRow(tableHeader,false,'td',rowProperties);

	let tableContent = [];

	dataset[0].forEach((dataPerWilayah,index)=>{
		tableContent = [{
			content:data_wilayah[dataPerWilayah.wilayah],
			attributes:{
				class:'camel-case'
			}

		}];
		
		tableContent.push({content:data_2014[index][variable] });
		tableContent.push({content:data_2015[index][variable] });
		tableContent.push({content:data_2016[index][variable] });
		tableContent.push({content:data_2017[index][variable] });
		tableContent.push({content:data_2018[index][variable] });
		
		dataTable.addNewRow(tableContent,false,'td',rowProperties);
	});

	dataTable.displayTable(".data-table-"+variable);

})

const toggleHiddenObjects = document.querySelectorAll('.toggleClassHidden');
  toggleHiddenObjects.forEach( function(toggle, index) {
    toggle.addEventListener('click',async (e)=>{
        
        const data_id = toggle.getAttribute('data-id');
        const hiddenElements = document.querySelectorAll('.body-'+data_id);
        
        hiddenElements.forEach( function(hiddenElement, ind) {
          hiddenElement.classList.toggle('hidden');
        });
    });
  });