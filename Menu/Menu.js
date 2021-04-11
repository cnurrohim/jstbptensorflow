export function createNav(activeMenu){
	const menus = [
		{
			href:'../Training/datapervariable.html',
			class:'',
			menu:'Training',
			icon:'fas fa-brain icon-menu',
		},
		{
			href:'../Pengujian/datapertahun.html',
			class:'',
			menu:'Pengujian',
			icon:'fas fa-check-double icon-menu',
		},
		{
			href:'../Prediksi/datapertahun.html',
			class:'',
			menu:'Prediksi',
			icon:'fas fa-book-reader icon-menu',
		},
	];
	

	const nav = document.querySelector('nav');
	nav.className = "shift-left cl_secondary";
	nav.innerHTML = '';
	const nav_h2 = document.createElement('h2');
	nav_h2.innerHTML = 'Pemetaan & Prediksi Tingkat Kesehatan Masyarakat di Wilayah Jawa Timur';
	nav_h2.className = "font_primary";
	nav.appendChild(nav_h2);

	const nav_ul = document.createElement('ul');
	const nav_ul_li = createLis(menus,nav_ul,activeMenu,'main');
	nav.appendChild(nav_ul_li);

	const toggleNav = document.createElement('span');
	toggleNav.addEventListener('click',toggleMenu,false);
	toggleNav.innerHTML = "<";
	nav.appendChild(toggleNav);

}

/*
	membuat menu listItem pada tag UL
	menu: object,
	nav_ul: parent tag
	activeMenu: String (nama Menu)
	activeClass: class-name
*/
export function createLis(menus,nav_ul,activeMenu,activeClass){
	let nav_li = {};
	let a = {};
	let active = '';
	let icon = {};
	menus.forEach((menu)=>{

		icon = document.createElement('i');
		icon.className = menu.icon;

		nav_li = document.createElement('li');
		a = document.createElement('a');
		a.innerHTML = menu.menu;
		a.className = "font_pairs";
		

		if(menu.class.length > 0){
			a.setAttribute('class',menu.class);
		}
		(menu.menu == activeMenu) ? a.classList.add(activeClass) : '' ;
		a.setAttribute('href',menu.href);
		
		a.prepend(icon);
		nav_li.appendChild(a);
		nav_ul.appendChild(nav_li);
	});

	return nav_ul;
}

export function renderMenu(ulContainer,menus){
	const sub_menu = document.querySelector(ulContainer.ulSelector);

	

	const nav_ul = document.createElement('ul');
	nav_ul.setAttribute('class',ulContainer.class);
	
	const ulMenu = createLis(menus,nav_ul,ulContainer.activeMenu,ulContainer.activeClass);
	const menuInfo = renderInfo(ulContainer.activeMenu,menus);
	sub_menu.appendChild(menuInfo);
	sub_menu.appendChild(ulMenu);
}

function renderInfo(activeMenu,menus){
	const menuInfo = document.createElement('div');
	menuInfo.setAttribute('class','menu-info font_pairs');

	const selectedMenu = menus.find((menu)=>{
		return menu.menu == activeMenu
	});
	
	menuInfo.innerHTML = (selectedMenu.info != undefined) ? selectedMenu.info : '';
	
	return menuInfo;
}

/*
 fungsi untuk membuat navigasi dan container bergeser
 ke kiri atau kanan untuk memberi space lebih pada layar
*/
function toggleMenu(){
	const nav = document.querySelector('nav');
	nav.classList.toggle('shift-left');

	const mainContainer = document.querySelector('.main-container');
	mainContainer.classList.toggle('shift-left');
}