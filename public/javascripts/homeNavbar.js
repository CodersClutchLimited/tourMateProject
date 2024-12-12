const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar a, .main a');

menu.onclick = () => {
    menu.classList.toggle('toggle');
    navbar.classList.toggle('open');
    // Toggle icon class
    if (menu.classList.contains('toggle')) {
        menu.classList.replace('ri-menu-line', 'ri-close-line');
    } else {
        menu.classList.replace('ri-close-line', 'ri-menu-line');
    }
};

// Highlight active link based on the current URL
const currentPath = window.location.pathname;
links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});


const dropdown = document.getElementById('dropdown');
const megaMenu = document.getElementById('megaMenu');
const countrySpan = document.querySelector('.country');
const languageSpan = document.querySelector('.language');
const currencySpan = document.querySelector('.currency');

// When dropdown is clicked, toggle the mega menu
dropdown.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent click from propagating to the document
  megaMenu.classList.toggle('active');
});

// Update the country when the select input changes
document.getElementById('countrySelect').addEventListener('change', (e) => {
  countrySpan.textContent = e.target.value;
});

// Update the language when a radio input is changed
document.querySelectorAll('input[name="language"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    languageSpan.textContent = e.target.value;
  });
});

// Update the currency when a radio input is changed
document.querySelectorAll('input[name="currency"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    currencySpan.textContent = e.target.value;
  });
});

// Close the mega menu when clicking outside the dropdown or mega menu
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !megaMenu.contains(e.target)) {
    megaMenu.classList.remove('active');
  }
});
