// form-container js
document.addEventListener("DOMContentLoaded", () => {
    const categoryBoxes = document.querySelectorAll(".category-box");
    const forms = document.querySelectorAll(".form-container");

    categoryBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            const targetId = box.getAttribute("data-target");

            // Hide all forms
            forms.forEach((form) => {
                form.classList.add("hidden");
            });

            // Show the targeted form
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.classList.remove("hidden");
            }
        });
    });
});

// browser container js
document.addEventListener('DOMContentLoaded', () => {
    // Select the paragraphs
    const smallo = document.querySelector('.smallo');
    const smally = document.querySelector('.smally');

    // Select the grid items
    const gridItem1 = document.getElementById('grid-item-1');
    const gridItem2 = document.getElementById('grid-item-2');

    // Function to toggle image visibility
    const toggleImageVisibility = (gridItem) => {
        const images = gridItem.querySelectorAll('.icon-container img');
        images.forEach(image => {
            image.style.display = image.style.display === 'none' ? 'block' : 'none';
        });
    };

    // Add click event listener for smallo
    smallo.addEventListener('click', () => {
        toggleImageVisibility(gridItem1);
    });

    // Add click event listener for smally
    smally.addEventListener('click', () => {
        toggleImageVisibility(gridItem2);
    });
});
const toggleVisibility = (element) => {
    element.classList.toggle('hidden');
};


// parallax

window.addEventListener('scroll', function () {
    const parallax = document.querySelector('.parallax');
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.5 + 'px'; // Adjust speed by changing 0.5
});

// stat-number
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");

    const animateCount = (el, target) => {
        let count = 0;
        const speed = 50; // Adjust the speed of the counting
        const increment = Math.ceil(target / 100); // Determines step size

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                el.textContent = `${count.toLocaleString()}+`;
                setTimeout(updateCounter, speed);
            } else {
                el.textContent = `${target.toLocaleString()}+`; // Ensures the exact target is displayed
            }
        };

        updateCounter();
    };

    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[,+]/g, ""), 10);
                animateCount(counter, target);
                observer.unobserve(counter); // Stop observing once the animation starts
            }
        });
    };

    const observer = new IntersectionObserver(startCounting, {
        threshold: 0.5 // Adjust the visibility threshold
    });

    counters.forEach(counter => observer.observe(counter));
});

// counter for hero-title
