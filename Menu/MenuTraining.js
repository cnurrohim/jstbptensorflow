import {createLis} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Fitur/datapervariable.html',
			class:'',
			menu:'Data Per Variable',
		},
		{
			href:'../Fitur/datapertahun.html',
			class:'',
			menu:'Data Per Tahun',
		},
		{
			href:'../Setting/setting.html',
			class:'',
			menu:'Setting',
		},
		{
			href:'../Training/Training.html',
			class:'',
			menu:'Training',
		},
	];
	
	const sub_menu = document.querySelector('.sub-menu-ul');

	const nav_ul = document.createElement('ul');
	nav_ul.setAttribute('class','sub-menu');
	const nav_ul_li = createLis(menus,nav_ul,activeMenu,'submenuactive');
	
	sub_menu.appendChild(nav_ul_li);
}