const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar a, .main a');
const dropdownArrow = document.querySelector('.dropdown-arrow');

menu.onclick = (event) => {
    event.stopPropagation();
    menu.classList.toggle('toggle');
    navbar.classList.toggle('open');
    if (menu.classList.contains('toggle')) {
        menu.classList.replace('ri-menu-line', 'ri-close-line');
    } else {
        menu.classList.replace('ri-close-line', 'ri-menu-line');
    }
};


document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menu.contains(event.target)) {
        if (navbar.classList.contains('open')) {
            menu.classList.remove('toggle');
            navbar.classList.remove('open');
            menu.classList.replace('ri-close-line', 'ri-menu-line');
        }
    }
});

dropdownArrow.onclick = (event) => {
    event.stopPropagation();
    if (navbar.classList.contains('open')) {
        menu.classList.remove('toggle');
        navbar.classList.remove('open');
        menu.classList.replace('ri-close-line', 'ri-menu-line');
    }
};

const currentPath = window.location.pathname;
links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});