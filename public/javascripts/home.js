const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Show 3 slides at all times
    spaceBetween: 20, // Space between slides
    loop: true, // Enable looping
    autoplay: {
        delay: 1000, // Time between transitions (in milliseconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
    },
    navigation: {
      // Disable default navigation buttons
      nextEl: null,
      prevEl: null,
    },
    // Remove or adjust breakpoints
    breakpoints: {
      768: { slidesPerView: 2 }, // Still show 3 slides on medium screens
      1024: { slidesPerView: 3 }, // Still show 3 slides on large screens
    },
});

// Custom navigation
document.getElementById('custom-prev').addEventListener('click', () => swiper.slidePrev());
document.getElementById('custom-next').addEventListener('click', () => swiper.slideNext());
