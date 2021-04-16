import {createLis,renderMenu} from './Menu.js';

export function createSubNav(activeMenu){
	const menus = [
		{
			href:'../Training/overview.html',
			class:'',
			menu:'Overview',
			info:''
		},
		{
			href:'../Training/datapervariable.html',
			class:'',
			menu:'Data Per Variable',
			info:'Pada tugas akhir ini digunakan 7 variable/faktor yang mempengaruhi derajat kesehatan masyarakat. dimana Bloom (1981) menyatakan bahwa ada 4 faktor yang mempengaruhi derajat kesehatan secara berturut-turut, yaitu: gaya hidup (life style), lingkungan (sosial, ekonomi, politik, budaya), pelayanan kesehatan, dan faktor genetik (keturunan). Keempat determinan tersebut saling berinteraksi dan mempengaruhi status kesehatan seseorang. <br/><br/> sedang tingkat kesehatan dapat dilihat dari Indeks kesehatan. yang mana merupakan cerminan dari tingkat kesehatan di suatu wilayah. Indeks kesehatan disusun berdasarkan Angka Harapan Hidup (BPS)'
		},
		{
			href:'../Training/datapertahun.html',
			class:'',
			menu:'Data Per Tahun',
			info:'nilai variable dinormalisasikan atau disamakan range nilainya menggunakan metode min-max. <br/><br/> dengan rumus: (nilai aktual - nilai terkecil) / (nilai terbesar - nilai terkecil) <br/>sehingga nilai tiap variable mempunyai range antara 0.0 - 0.1 <br/><br/> '
		},
		{
			href:'../Training/setting.html',
			class:'',
			menu:'Setting',
			info:'Terdapat 7 input dan 1 output, jadi Arsitektur atau model JST akan menjadi 7 [layer hidden] 1, <br/> layer hidden didapat dari input <b>jumlah hidden neuron</b> <br/> dengan format <br/>[jumlah neuron|number] [spasi] [jumlah neuron|number] <br/> misal jumlah hidden neuron: 4 5 6, artinya terdapat tiga layer  <br/> layer 1: 4 neuron, <br/> layer 2: 5 neuron, <br/> layer 3: 6 neuron <br/> sehingga arsitektur JST menjadi 7 4 5 6 1'
		},
		{
			href:'../Training/Training.html',
			class:'',
			menu:'Training',
			info:'Pelatihan JST selesai saat jumlah epoch terpenuhi, dan MSE mendekati 0. yang artinya hasil prediksi JST tidak berbeda jauh dengan target aktual'
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