let lastScrollTop = 0;

document.addEventListener('scroll', function () {
    const footer = document.querySelector('.footer');
    const showMapContainer = document.querySelector('.show-map-container');
    
    const footerRect = footer.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    
    // Calculate the distance from the bottom of the screen (4-5cm = ~150px)
    const distanceFromBottom = document.documentElement.scrollHeight - (currentScroll + viewportHeight);

    // Determine if scrolling up or down
    if (currentScroll > lastScrollTop) {
        if (distanceFromBottom <= 250 && !showMapContainer.classList.contains('hidden')) {
            showMapContainer.classList.add('hidden');
        }
    } else {
        if (distanceFromBottom >= 250 && showMapContainer.classList.contains('hidden')) {
            showMapContainer.classList.remove('hidden');
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});