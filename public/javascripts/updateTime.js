function formatTimeDifference(createdAt) {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInMinutes = Math.floor((now - posted) / 60000);

    if (diffInMinutes < 1) {
        return 'just now';
    }
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
}

function updateTimes(campgrounds) {
    campgrounds.forEach(campground => {
        const timeElement = document.getElementById(`listed-time-${campground._id}`);
        if (timeElement) {
            const newTime = formatTimeDifference(campground.createdAt);
            timeElement.innerHTML = `Listed <span>• ${newTime}</span>`;
        }
    });
}

// Call this function when the page loads
function startUpdatingTimes(campgrounds) {
    updateTimes(campgrounds);  // Initial call
    setInterval(() => updateTimes(campgrounds), 60000);  // Update every 60 seconds
}
