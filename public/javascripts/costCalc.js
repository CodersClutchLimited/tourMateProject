document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const numberOfGuestsInput = document.getElementById('numberOfGuests');
    const totalCostSpan = document.getElementById('totalCost');

    const campgroundRate = parseFloat(document.getElementById('reservation-form').dataset.price);

    function calculateTotalCost() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const numberOfGuests = parseInt(numberOfGuestsInput.value, 10);

        if (startDate && endDate && numberOfGuests) {
            // Calculate the number of days, ensuring at least 1 day is charged
            let days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (days < 1) {
                days = 1; // Ensure at least 1 day is charged for one-night stays
            }

            const totalCost = days * campgroundRate * numberOfGuests;
            totalCostSpan.textContent = `$${totalCost.toFixed(2)}`;
        }
    }

    startDateInput.addEventListener('change', calculateTotalCost);
    endDateInput.addEventListener('change', calculateTotalCost);
    numberOfGuestsInput.addEventListener('change', calculateTotalCost);
});


// document.addEventListener('DOMContentLoaded', () => {
//     const startDateInput = document.getElementById('startDate');
//     const endDateInput = document.getElementById('endDate');
//     const numberOfGuestsInput = document.getElementById('numberOfGuests');
//     const totalCostSpan = document.getElementById('totalCost');

//     const campgroundRate = parseFloat(document.getElementById('reservation-form').dataset.price);

//     function calculateTotalCost() {
//         const startDate = new Date(startDateInput.value);
//         const endDate = new Date(endDateInput.value);
//         const numberOfGuests = parseInt(numberOfGuestsInput.value, 10);

//         if (startDate && endDate && numberOfGuests) {
//             const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
//             const totalCost = days * campgroundRate * numberOfGuests;
//             totalCostSpan.textContent = `$${totalCost.toFixed(2)}`;
//         }
//     }

//     startDateInput.addEventListener('change', calculateTotalCost);
//     endDateInput.addEventListener('change', calculateTotalCost);
//     numberOfGuestsInput.addEventListener('change', calculateTotalCost);
// });
