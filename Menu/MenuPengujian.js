import {createLis,renderMenu} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
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
			href:'../Pengujian/pengujian.html',
			class:'',
			menu:'Pengujian',
		},
	];
	
	const ulContainer =
		{
			ulSelector: '.sub-menu-ul',
			class:'sub-menu',
			activeClass:'submenuactive',
			menus:menus,
			activeMenu:activeMenu
		};

	const ulMenu = renderMenu(ulContainer,menus);
}