import {createLis} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Fitur/datapertahun',
			class:'',
			menu:'Data Per Tahun',
		},
		{
			href:'../Fitur/datanormalisasi',
			class:'',
			menu:'Hasil Normalisasi',
		},
		{
			href:'../Setting/setting',
			class:'',
			menu:'Setting',
		},
		{
			href:'../Prediksi/prediksi',
			class:'',
			menu:'Prediksi',
		},
		{
			href:'../Prediksi/hasil',
			class:'',
			menu:'Hasil',
		}
	];
	
	const sub_menu = document.querySelector('.sub-menu-ul');

	const nav_ul = document.createElement('ul');
	nav_ul.setAttribute('class','sub-menu');
	const nav_ul_li = createLis(menus,nav_ul,activeMenu,'submenuactive');
	
	sub_menu.appendChild(nav_ul_li);
}