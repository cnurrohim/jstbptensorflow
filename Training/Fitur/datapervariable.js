import {createNav} from '../../Menu/Menu.js';
import {createSubNav} from '../../Menu/MenuTraining.js';

import {Table} from '../../Lib/Table.js';

import {
		variables,
		variableTitles,
		dataset,
		tahunDataSet,
		targetDataset,
		tahunTargetDataSet,
		variableTarget,
		variableTargetTitles,
		dataTargetMinMax,
		jmlKategori
} from '../../Data/DataMaster.js';

import {data_wilayah} from '../../Data/JS/dataWilayah.js';

// import {data_2014} from '../../Data/JS/2014.js';
// import {data_2015} from '../../Data/JS/2015.js';
// import {data_2016} from '../../Data/JS/2016.js';
// import {data_2017} from '../../Data/JS/2017.js';
// import {data_2018} from '../../Data/JS/2018.js';

import {data_2014} from '../../Data/JS/7VAR_2014.js';
import {data_2015} from '../../Data/JS/7VAR_2015.js';
import {data_2016} from '../../Data/JS/7VAR_2016.js';
import {data_2017} from '../../Data/JS/7VAR_2017.js';
import {data_2018} from '../../Data/JS/7VAR_2018.js';

import {target_2014} from '../../Data/JS/targetAHH_2014.js';
import {target_2015} from '../../Data/JS/targetAHH_2015.js';
import {target_2016} from '../../Data/JS/targetAHH_2016.js';
import {target_2017} from '../../Data/JS/targetAHH_2017.js';
import {target_2018} from '../../Data/JS/targetAHH_2018.js';


const tableProperties = {
	'cellspacing':0
};

const trProperties = {
	'class':'no-select select-head cl_accents font_accents lighter'
}

createNav('Training');
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
		'class':'cl_secondary font_accents hidden body-'+variable
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
		
		const content2014 = (data_2014[index][variable]) ? data_2014[index][variable] : '-' ;
		const content2015 = (data_2015[index][variable]) ? data_2015[index][variable] : '-' ;
		const content2016 = (data_2016[index][variable]) ? data_2016[index][variable] : '-' ;
		const content2017 = (data_2017[index][variable]) ? data_2017[index][variable] : '-' ;
		const content2018 = (data_2018[index][variable]) ? data_2018[index][variable] : '-' ;
		
		tableContent.push({content:content2014 });
		tableContent.push({content:content2015 });
		tableContent.push({content:content2016 });
		tableContent.push({content:content2017 });
		tableContent.push({content:content2018 });

		dataTable.addNewRow(tableContent,false,'td',rowProperties);
	});

	dataTable.displayTable(".data-table-"+variable);

})

variableTarget.forEach((variable,index)=>{
	const dataTable = new Table(tableProperties);

	let tableTitle = [
		{
			content: 'TARGET : '+variableTargetTitles[index],
			attributes:{
				colspan:6,
				class:'cl_accents font_accents toggleClassHidden head-'+variable,
				'data-id':variable
			}
		}
	];

	dataTable.addNewRow(tableTitle,false,'td',trProperties);

	let tableHeader = [{content:'Wilayah'}];

	targetDataset.forEach((dataPerTahun,tahunIndex)=>{
		tableHeader.push({content:tahunDataSet[tahunIndex]});
	});

	let rowProperties = {
		'class':'cl_secondary font_accents hidden body-'+variable
	}

	dataTable.addNewRow(tableHeader,false,'td',rowProperties);

	let tableContent = [];

	targetDataset[0].forEach((dataPerWilayah,index)=>{
		tableContent = [{
			content:data_wilayah[dataPerWilayah.wilayah],
			attributes:{
				class:'camel-case'
			}

		}];
		
		const content2014 = (target_2014[index][variable]) ? target_2014[index][variable].toFixed(2) : '-' ;
		const content2015 = (target_2015[index][variable]) ? target_2015[index][variable].toFixed(2) : '-' ;
		const content2016 = (target_2016[index][variable]) ? target_2016[index][variable].toFixed(2) : '-' ;
		const content2017 = (target_2017[index][variable]) ? target_2017[index][variable].toFixed(2) : '-' ;
		const content2018 = (target_2018[index][variable]) ? target_2018[index][variable].toFixed(2) : '-' ;
		
		
		tableContent.push({content:content2014 });
		tableContent.push({content:content2015 });
		tableContent.push({content:content2016 });
		tableContent.push({content:content2017 });
		tableContent.push({content:content2018 });
		

		dataTable.addNewRow(tableContent,false,'td',rowProperties);
	});


	dataTable.displayTable(".data-table-target");
});


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