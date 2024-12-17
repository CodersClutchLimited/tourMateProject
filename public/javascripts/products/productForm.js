// JavaScript to handle adding new input fields
const tagContainer = document.getElementById('tag-container');
const addTagBtn = document.getElementById('add-tag-btn');

addTagBtn.addEventListener('click', () => {
    // Create a new input field
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'product[tags][]';
    newInput.placeholder = 'Enter a tag';
    newInput.className = 'w-24 p-1 text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-2';
    // Append the new input field to the container
    tagContainer.appendChild(newInput);
});



const colorContainer = document.getElementById('color-container')
const addColorBtn = document.getElementById('add-color-btn')

addColorBtn.addEventListener('click', () => {
    const newColor = document.createElement('input');
    newColor.type = 'text'
    newColor.name = 'product[colors][]'
    newColor.placeholder = 'e.g red'
    newColor.className = 'w-24 p-1 text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-2'
    colorContainer.appendChild(newColor)
})

