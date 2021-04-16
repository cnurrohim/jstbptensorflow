import {createLis,renderMenu} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Prediksi/overview.html',
			class:'',
			menu:'Overview',
			info:''
		},
		{
			href:'../Prediksi/datapertahun.html',
			class:'',
			menu:'Data Per Tahun',
			info: 'Salah satu batasan masalah pada tugas akhir ini yaitu prediksi hanya dilakukan pada tahun 2019, 2020, dan 2021 <br/> dengan data latih dan uji mulai tahun 2014-2018 <br/><br/> disini user dapat menginputkan nilai variabel tiap wilayah dan melihat grafik naik turunnya variabel pada saat mengklik input field '
		},
		{
			href:'../Prediksi/datanormalisasi.html',
			class:'',
			menu:'Hasil Normalisasi',
			info: 'Nilai tiap variable kembali disamakan atau dinormalisasikan sebelum dilakukan prediksi.'
		},
		{
			href:'../Prediksi/setting.html',
			class:'',
			menu:'Setting',
			info: 'User memilih model/arsitektur yang sudah melalui pengujian'
		},
		{
			href:'../Prediksi/prediksi.html',
			class:'',
			menu:'Prediksi',
			info:'Prediksi ditampilkan dalam bentuk pemetaan sehingga dapat diketahui perubahan dari tahun ke tahun'
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