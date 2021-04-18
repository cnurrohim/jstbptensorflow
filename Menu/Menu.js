export function createNav(activeMenu){
	const listMenu = getListMenu();
	const navTitle = getNavTitle();
	const navMenu = getNavMenu(listMenu,activeMenu);
	const barToggleMenu = getbarToggleMenu();

	setNavigationPane(listMenu,navTitle,navMenu,barToggleMenu);
}

function setNavigationPane(listMenu,navTitle,navMenu,barToggleMenu){
	const nav = document.querySelector('nav');
	nav.className = "shift-left cl_secondary";
	nav.appendChild(navTitle);
	nav.appendChild(navMenu);
	document.body.appendChild(barToggleMenu);
}

function getNavTitle(){
	const navTitle = document.createElement('h2');
	navTitle.innerHTML = 'Pemetaan & Prediksi Tingkat Kesehatan Masyarakat di Wilayah Jawa Timur';
	navTitle.className = "font_primary";

	return navTitle;
}

function getNavMenu(listMenu,activeMenu){
	const nav_ul = document.createElement('ul');
	const navMenu = createLis(listMenu,nav_ul,activeMenu,'main');

	return navMenu;
}

function getbarToggleMenu(){
	const barToggleMenu = document.createElement('span');
	barToggleMenu.addEventListener('click',toggleMenu,false);
	barToggleMenu.className = "fas fa-bars icon-menu font_accents cl_accents";
	barToggleMenu.setAttribute('id','mobile-menu');
	barToggleMenu.innerHTML = "";
	return barToggleMenu;
}

function getListMenu(){
	const listMenu = [
		{
			href:'../Training/overview.html',
			class:'',
			menu:'Pelatihan',
			icon:'fas fa-brain icon-menu',
		},
		{
			href:'../Pengujian/overview.html',
			class:'',
			menu:'Pengujian',
			icon:'fas fa-check-double icon-menu',
		},
		{
			href:'../Prediksi/overview.html',
			class:'',
			menu:'Prediksi',
			icon:'fas fa-book-reader icon-menu',
		},
	];

	return listMenu;
}

/*
	membuat menu listItem pada tag UL
	menu: object,
	nav_ul: parent tag
	activeMenu: String (nama Menu)
	activeClass: class-name
*/
export function createLis(listMenu,nav_ul,activeMenu,activeClass){
	let active = '';

	listMenu.forEach((menu)=>{
		const a = document.createElement('a');
		const icon = document.createElement('i');
		icon.className = menu.icon;
		a.innerHTML = menu.menu;
		setLinkMenuAttribute(a,menu,activeMenu,activeClass);
		appendLinkToNavigationPane(a,icon,nav_ul);
	});

	return nav_ul;
}

function appendLinkToNavigationPane(a,icon,nav_ul){
	const nav_li = document.createElement('li');
	a.prepend(icon);
	nav_li.appendChild(a);
	nav_ul.appendChild(nav_li);
}

function setLinkMenuAttribute(a,menu,activeMenu,activeClass){
	a.className = "font_pairs";
	if(menu.class.length > 0){
		a.setAttribute('class',menu.class);
	}
	(menu.menu == activeMenu) ? a.classList.add(activeClass) : '' ;
	a.setAttribute('href',menu.href);
}

export function renderMenu(ulContainer,listMenu){
	const sub_menu = document.querySelector(ulContainer.ulSelector);

	const nav_ul = document.createElement('ul');
	nav_ul.setAttribute('class',ulContainer.class);
	
	const ulMenu = createLis(listMenu,nav_ul,ulContainer.activeMenu,ulContainer.activeClass);
	const menuInfo = renderInfo(ulContainer.activeMenu,listMenu);
	sub_menu.appendChild(menuInfo);
	sub_menu.appendChild(ulMenu);
}

function renderInfo(activeMenu,listMenu){
	const menuInfo = document.createElement('div');
	menuInfo.setAttribute('class','menu-info font_pairs ft_size_detail');

	const selectedMenu = listMenu.find((menu)=>{
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