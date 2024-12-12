document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.campground-card').forEach(card => {
        const carousel = card.querySelector('.carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');

        let currentIndex = 0;
        let startX;

        function updateButtonsVisibility() {
            if (currentIndex === 0) {
                prevButton.style.opacity = '0';
                prevButton.style.visibility = 'hidden';
                nextButton.style.opacity = '1';
                nextButton.style.visibility = 'visible';
            } else if (currentIndex === slides.length - 1) {
                nextButton.style.opacity = '0';
                nextButton.style.visibility = 'hidden';
                prevButton.style.opacity = '1';
                prevButton.style.visibility = 'visible';
            } else {
                prevButton.style.opacity = '1';
                prevButton.style.visibility = 'visible';
                nextButton.style.opacity = '1';
                nextButton.style.visibility = 'visible';
            }
        }

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            updateButtonsVisibility();
        }

        function handleMouseEnter() {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
            updateCarousel();
        }

        function handleMouseLeave() {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        carousel.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (event) => {
            const endX = event.changedTouches[0].clientX;
            const threshold = 50;

            if (startX > endX + threshold) {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            } else if (startX < endX - threshold) {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
                updateCarousel();
            }
        });
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelectorAll('.campground-card').forEach(card => {
//         const carousel = card.querySelector('.carousel');
//         if (!carousel) return;


//         const slides = carousel.querySelectorAll('.carousel-slide');
//         const dots = carousel.querySelectorAll('.dot');
//         const prevButton = carousel.querySelector('.carousel-prev');
//         const nextButton = carousel.querySelector('.carousel-next');


//         let currentIndex = 0;


//         function updateButtonsVisibility() {
//             if (currentIndex === 0) {
//                 prevButton.style.opacity = '0';
//                 prevButton.style.visibility = 'hidden';
//                 nextButton.style.opacity = '1';
//                 nextButton.style.visibility = 'visible';
//             } else if (currentIndex === slides.length - 1) {
//                 nextButton.style.opacity = '0';
//                 nextButton.style.visibility = 'hidden';
//                 prevButton.style.opacity = '1';
//                 prevButton.style.visibility = 'visible';
//             } else {
//                 prevButton.style.opacity = '1';
//                 prevButton.style.visibility = 'visible';
//                 nextButton.style.opacity = '1';
//                 nextButton.style.visibility = 'visible';
//             }
//         }


//         function updateCarousel() {
//             const offset = -currentIndex * 100;
//             carousel.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
//             dots.forEach((dot, index) => {
//                 dot.classList.toggle('active', index === currentIndex);
//             });
//             updateButtonsVisibility();
//         }


//         function handleMouseEnter() {
//             prevButton.style.display = 'block';
//             nextButton.style.display = 'block';
//             updateCarousel();
//         }


//         function handleMouseLeave() {
//             prevButton.style.display = 'none';
//             nextButton.style.display = 'none';
//         }


//         prevButton.addEventListener('click', () => {
//             currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
//             updateCarousel();
//         });


//         nextButton.addEventListener('click', () => {
//             currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
//             updateCarousel();
//         });


//         dots.forEach((dot, index) => {
//             dot.addEventListener('click', () => {
//                 currentIndex = index;
//                 updateCarousel();
//             });
//         });


//         card.addEventListener('mouseenter', handleMouseEnter);
//         card.addEventListener('mouseleave', handleMouseLeave);
//     });
// });
