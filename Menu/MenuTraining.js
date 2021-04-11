import {createLis,renderMenu} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Training/datapervariable.html',
			class:'',
			menu:'Data Per Variable',
			info:'Info Data Per Variable'
		},
		{
			href:'../Training/datapertahun.html',
			class:'',
			menu:'Data Per Tahun',
			info:'Info Data Per Tahun'
		},
		{
			href:'../Training/setting.html',
			class:'',
			menu:'Setting',
			info:'Info Setting'
		},
		{
			href:'../Training/Training.html',
			class:'',
			menu:'Training',
			info:'Info Training'
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