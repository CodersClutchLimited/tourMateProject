let previousScrollTop = 0; // Changed from lastScrollTop

document.addEventListener('scroll', function () {
    const footerElement = document.querySelector('.footer'); // Changed to footerElement
    const messageIconElement = document.querySelector('.message-icon'); // Changed to messageIconElement
    
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Changed to currentScrollPosition
    
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    
    // Calculate the distance from the bottom of the screen (4-5cm = ~150px)
    const distanceFromBottom = document.documentElement.scrollHeight - (currentScrollPosition + viewportHeight);

    // Determine if scrolling up or down
    if (currentScrollPosition > previousScrollTop) {
        // Scrolling down
        if (distanceFromBottom <= 250 && !messageIconElement.classList.contains('message-hidden')) {
            messageIconElement.classList.add('message-hidden');
        }
    } else {
        // Scrolling up
        if (distanceFromBottom >= 250 && messageIconElement.classList.contains('message-hidden')) {
            messageIconElement.classList.remove('message-hidden');
        }
    }

    previousScrollTop = currentScrollPosition <= 0 ? 0 : currentScrollPosition; // For Mobile or negative scrolling
});
