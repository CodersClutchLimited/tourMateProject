document.addEventListener("DOMContentLoaded", function () {
    const bar2 = document.querySelector('.bar2');
    const searchBar = document.querySelector('.bar');
    const searchInput = searchBar.querySelector('input[type="search"]');
    let isVisible = false;
    let triggerScrollUp = false;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0 && !isVisible) {
            bar2.classList.add('show');
            isVisible = true;
        } else if (window.scrollY === 0 && isVisible) {
            bar2.classList.remove('show');
            isVisible = false;
        }
        if (window.scrollY === 0 && triggerScrollUp) {
            searchBar.classList.add('active');
            // Use setTimeout to delay focus
            setTimeout(() => {
                searchInput.focus();
            }, 100); // 100 milliseconds delay
            
            // Automatically remove the 'active' class after 1 second
            setTimeout(function () {
                searchBar.classList.remove('active');
            }, 1000);
            
            triggerScrollUp = false;
        }
    });

    const searchIcon = document.querySelector('.bar2 i');
    searchIcon.addEventListener('click', function () {
        triggerScrollUp = true;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});