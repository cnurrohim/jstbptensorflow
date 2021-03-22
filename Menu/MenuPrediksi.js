import {createLis,renderMenu} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Fitur/datapertahun.html',
			class:'',
			menu:'Data Per Tahun',
		},
		{
			href:'../Fitur/datanormalisasi.html',
			class:'',
			menu:'Hasil Normalisasi',
		},
		{
			href:'../Setting/setting.html',
			class:'',
			menu:'Setting',
		},
		{
			href:'../Prediksi/prediksi.html',
			class:'',
			menu:'Prediksi',
		},
		// {
		// 	href:'../Prediksi/hasil.html',
		// 	class:'',
		// 	menu:'Hasil',
		// }
	];
	
	const ulContainer = 
		{
			ulSelector: '.sub-menu-ul',
			class:'sub-menu font_pairs',
			activeClass:'submenuactive',
			menus:menus,
			activeMenu:activeMenu
		};

	const ulMenu = renderMenu(ulContainer,menus);
}