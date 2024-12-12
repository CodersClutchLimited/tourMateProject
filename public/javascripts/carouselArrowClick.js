document.querySelectorAll('.carousel-prev, .carousel-next, .dot, .favorite-icon').forEach((element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
});