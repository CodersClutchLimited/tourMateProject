const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.image-row .thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.dataset.image;
    });
});