document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    const availabilityMessage = document.getElementById('availability-message');
    
    
    if (!form || !availabilityMessage) {
        console.error('Form or availability message element not found.');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        
        if (!startDate || !endDate) {
            availabilityMessage.textContent = 'Please select both start and end dates.';
            return;
        }

        
        const url = `/campgrounds/${form.dataset.campgroundId}/check-availability?startDate=${startDate}&endDate=${endDate}`;
        
        
        console.log('Checking availability with URL:', url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.isAvailable) {
                    form.submit();
                } else {
                    availabilityMessage.textContent = 'Fully booked for the selected dates.';
                }
            })
            .catch(error => {
                console.error('Error checking availability:', error);
                availabilityMessage.textContent = 'An error occurred while checking availability.';
            });
    });
});
