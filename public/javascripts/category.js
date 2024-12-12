document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.categories-prev');
    const nextButton = document.querySelector('.categories-next');
    const categoriesWrapper = document.querySelector('.categories-wrapper');
    const categories = document.querySelector('.categories');
    const categoriesContainer = document.querySelector('.categories-container');

    let currentIndex = 0;
    let itemWidth = 150;
    let itemsToShow;
    let totalWidth;
    let maxIndex;

    let startX;

    function updateCategories() {
        itemWidth = categories.children[0].offsetWidth + parseFloat(getComputedStyle(categories.children[0]).marginRight);
        
        totalWidth = categories.scrollWidth;
        itemsToShow = Math.floor(categoriesWrapper.clientWidth / itemWidth);
        maxIndex = Math.max(0, Math.ceil((totalWidth - categoriesWrapper.clientWidth) / itemWidth));

        const offset = Math.min(currentIndex * itemWidth, (totalWidth - categoriesWrapper.clientWidth));
        categories.style.transform = `translateX(-${offset}px)`;

        updateArrows();
        updateFadeEffect();
    }

    function updateArrows() {
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex >= maxIndex ? 'none' : 'block';
    }

    function updateFadeEffect() {
        categoriesContainer.classList.remove('fade-left', 'fade-right', 'fade-both');

        if (currentIndex > 0 && currentIndex < maxIndex) {
            categoriesContainer.classList.add('fade-both');
        } else if (currentIndex > 0) {
            categoriesContainer.classList.add('fade-left');
        } else if (currentIndex < maxIndex) {
            categoriesContainer.classList.add('fade-right');
        }
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCategories();
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCategories();
        }
    });

    categoriesWrapper.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    categoriesWrapper.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const threshold = 50;

        if (startX > endX + threshold) {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCategories();
            }
        } else if (startX < endX - threshold) {
            if (currentIndex > 0) {
                currentIndex--;
                updateCategories();
            }
        }

        updateFadeEffect();
    });

    updateCategories();

    window.addEventListener('resize', updateCategories);
});


// document.addEventListener('DOMContentLoaded', function () {
//     const prevButton = document.querySelector('.categories-prev');
//     const nextButton = document.querySelector('.categories-next');
//     const categoriesWrapper = document.querySelector('.categories-wrapper');
//     const categories = document.querySelector('.categories');
//     const categoriesContainer = document.querySelector('.categories-container');
    
//     let currentIndex = 0;
//     let itemWidth = 150;
//     let itemsToShow;
//     let totalWidth;
//     let maxIndex;
    
//     function updateCategories() {
        
//         itemWidth = categories.children[0].offsetWidth + parseFloat(getComputedStyle(categories.children[0]).marginRight);
        
        
//         totalWidth = categories.scrollWidth;
//         itemsToShow = Math.floor(categoriesWrapper.clientWidth / itemWidth);
//         maxIndex = Math.max(0, Math.ceil((totalWidth - categoriesWrapper.clientWidth) / itemWidth));

        
//         const offset = Math.min(currentIndex * itemWidth, (totalWidth - categoriesWrapper.clientWidth));
//         categories.style.transform = `translateX(-${offset}px)`;
        
//         updateArrows();
//         updateFadeEffect();
//     }

//     function updateArrows() {
//         prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
//         nextButton.style.display = currentIndex >= maxIndex ? 'none' : 'block';
//     }
    
//     function updateFadeEffect() {
        
//         categoriesContainer.classList.remove('fade-left', 'fade-right', 'fade-both');

        
//         if (currentIndex > 0 && currentIndex < maxIndex) {
            
//             categoriesContainer.classList.add('fade-both');
//         } else if (currentIndex > 0) {
            
//             categoriesContainer.classList.add('fade-left');
//         } else if (currentIndex < maxIndex) {
            
//             categoriesContainer.classList.add('fade-right');
//         }
//     }
    
//     prevButton.addEventListener('click', function () {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateCategories();
//         }
//     });
    
//     nextButton.addEventListener('click', function () {
//         if (currentIndex < maxIndex) {
//             currentIndex++;
//             updateCategories();
//         }
//     });
    
//     updateCategories();
    
//     window.addEventListener('resize', updateCategories);
// });
