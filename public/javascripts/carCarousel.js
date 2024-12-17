document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        const paginationLines = card.querySelectorAll('.pagination-line');
        const carImages = card.querySelectorAll('.carousel-img');

        // Hide all images initially except the first one
        carImages.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        paginationLines.forEach(line => {
            line.addEventListener('mouseover', (event) => {
                const targetIndex = event.target.getAttribute('data-target');

                // Hide all images
                carImages.forEach(img => img.style.display = 'none');

                // Show the image corresponding to the hovered pagination line
                const targetImage = card.querySelector(`.carousel-img[data-index="${targetIndex}"]`);
                if (targetImage) {
                    targetImage.style.display = 'block';
                }

                // Update active state for pagination lines
                paginationLines.forEach(line => line.classList.remove('active'));
                event.target.classList.add('active');
            });
        });
    });
});
