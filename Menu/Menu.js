export function createNav(activeMenu){
	const menus = [
		{
			href:'../../Training/Fitur/datapervariable',
			class:'',
			menu:'Training',
		},
		{
			href:'../../Pengujian/Fitur/datapertahun',
			class:'',
			menu:'Pengujian',
		},
		{
			href:'../../Prediksi/Fitur/datapertahun',
			class:'',
			menu:'Prediksi',
		},
	];
	

	const nav = document.querySelector('nav');
	nav.className = "shift-left";
	nav.innerHTML = '';
	const nav_h2 = document.createElement('h2');
	nav_h2.innerHTML = 'Pemetaan & Prediksi Tingkat Kesehatan Masyarakat di Wilayah Jawa Timur';
	nav.appendChild(nav_h2);

	const nav_ul = document.createElement('ul');
	const nav_ul_li = createLis(menus,nav_ul,activeMenu,'main');
	nav.appendChild(nav_ul_li);

	const toggleNav = document.createElement('span');
	toggleNav.addEventListener('click',toggleMenu,false);
	toggleNav.innerHTML = "<";
	nav.appendChild(toggleNav);

}

export function createLis(menus,nav_ul,activeMenu,activeClass){
	let nav_li = {};
	let a = {};
	let active = '';
	menus.forEach((menu)=>{
		nav_li = document.createElement('li');
		a = document.createElement('a');
		a.innerHTML = menu.menu;
		
		
		if(menu.class.length > 0){
			a.setAttribute('class',menu.class);
		}
		(menu.menu == activeMenu) ? a.classList.add(activeClass) : '' ;
		a.setAttribute('href',menu.href);

		nav_li.appendChild(a);
		nav_ul.appendChild(nav_li);
	});

	return nav_ul;
}

function toggleMenu(){
	const nav = document.querySelector('nav');
	nav.classList.toggle('shift-left');

	const mainContainer = document.querySelector('.main-container');
	mainContainer.classList.toggle('shift-left');
}