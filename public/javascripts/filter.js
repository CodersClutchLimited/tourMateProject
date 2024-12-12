document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    const campgroundCards = document.querySelectorAll('.campground-card');
    const noUploadsMessage = document.getElementById('no-uploads');


    // Function to update category selection and display cards
    function updateCategory(selectedCategory) {
        let hasVisibleCards = false;


        // Remove 'selected' class from all category items
        categoryItems.forEach(i => i.classList.remove('selected'));


        // Add 'selected' class to the clicked or default category item
        categoryItems.forEach(item => {
            if (item.getAttribute('data-category') === selectedCategory) {
                item.classList.add('selected');
            }
        });


        // Show or hide campground cards based on selected category
        campgroundCards.forEach(card => {
            if (selectedCategory === 'All' || card.getAttribute('data-category') === selectedCategory) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });


        // Show or hide the "No uploads yet" message
        if (hasVisibleCards) {
            noUploadsMessage.style.display = 'none';
        } else {
            noUploadsMessage.style.display = 'block';
        }
    }


    // Add event listeners to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-category');
            updateCategory(selectedCategory);
        });
    });


    // Initialize with 'All' category selected
    updateCategory('All');
});