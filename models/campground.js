const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema;
const Review = require('./review');
const Reservation = require('./reservation');
const { required } = require('joi');


const ImageSchema = new Schema({
    url: String,
    filename: String
})


ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200')
});


const opts = {toJSON:  {virtuals: true}}


const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    amenities: {
        type: [String],
        enum: [
            'Wi-Fi', 'Parking', 'Pets Allowed', 'Swimming Pool', 'Air Conditioning',
            'Laundry', 'BBQ Area', 'Fire Pits', 'Hot Tub', 'Gym', 'Electric Hookups',
            'Water Hookups', 'Showers', 'Bathrooms', 'Picnic Area', 'Playground'
        ],
        default: []
    },
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    guests: {
        type: Number, //Number of guests
        required: true
    },
    bedrooms: {
        type: Number, //Number of bedrooms
        required: true
    },
    beds: {
        type: Number, //Number of bedrooms
        required: true
    },
    bathrooms: {
        type: Number, //Number of bathrooms
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    category: {
        type: String, // Category field
        required: true,
        enum: ['Apartments', 'Houses', 'Condos', 'Studios', 'Townhouses', 'Lofts', 'Duplexes', 'Penthouses', 'Villas', 'Cabins', 'Cottages', 'Homes', 'Mansions', 'Farms', 'Land', 'Offices', 'Retail Spaces', 'Warehouses', 'Garages', 'Events', 'Luxury Rentals', 'Vacation Rentals', 'Short-Term Rentals', 'Long-Term Rentals', 'Pet-Friendly Rentals', 'Senior Living', 'Student Housing', 'Commercial Properties', 'Mixed-Use Properties', 'Investment Properties', 'New Constructions', 'Historic Homes', 'Furnished Rentals', 'Unfurnished Rentals', 'Shared Housing', 'Sublets', 'Room Rentals', 'Retirement Communities']
    },
    manualUnavailableDates: [
        {
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        }
    ],
    reservations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reservation'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation time
    }
}, opts);


CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 25)}...</p>`
});


CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
});

// Add the post middleware hook here
CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        // Remove references to the deleted reviews in all campgrounds
        await Campground.updateMany(
            { reviews: { $in: doc.reviews } },
            { $pull: { reviews: { $in: doc.reviews } } }
        );
    }
});


module.exports = mongoose.model('Campground', CampgroundSchema);