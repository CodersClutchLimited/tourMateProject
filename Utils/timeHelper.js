const moment = require('moment');

function formatTimeDifference(date) {
    const now = moment();
    const posted = moment(date);

    const diffInMinutes = now.diff(posted, 'minutes');
    if (diffInMinutes < 1) {
        return 'just now';
    }
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = now.diff(posted, 'hours');
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    }

    const diffInDays = now.diff(posted, 'days');
    if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    }
    
    const diffInWeeks = now.diff(posted, 'weeks');
    if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`;
    }

    const diffInMonths = now.diff(posted, 'months');
    if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    }

    const diffInYears = now.diff(posted, 'years');
    return `${diffInYears} years ago`;
}

module.exports = formatTimeDifference;
