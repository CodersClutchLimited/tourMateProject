document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar-container');


    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 0) { // Check if user has scrolled
            searchBar.classList.add('hidden');
        } else {
            searchBar.classList.remove('hidden');
        }
    }


    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});