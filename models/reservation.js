const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    campground: {
        type: Schema.Types.ObjectId,
        ref: 'Campground', // Reference to the campground being booked
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user making the reservation
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    specialRequest: {
        type: String, // Optional text field for special requests
        default: ''   // Provide a default empty string if not provided
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
