import {createLis} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Fitur/datapertahun',
			class:'',
			menu:'Data Per Tahun',
		},
		{
			href:'../Setting/Setting',
			class:'',
			menu:'Setting',
		},
		{
			href:'../Pengujian/pengujian',
			class:'',
			menu:'Pengujian',
		},
	];
	
	const sub_menu = document.querySelector('.sub-menu-ul');

	const nav_ul = document.createElement('ul');
	nav_ul.setAttribute('class','sub-menu');
	const nav_ul_li = createLis(menus,nav_ul,activeMenu,'submenuactive');
	
	sub_menu.appendChild(nav_ul_li);
}