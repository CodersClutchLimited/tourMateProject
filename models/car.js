const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema explicitly

// Image Schema for handling images
const ImageSchema = new Schema({
    url: String,
    filename: String,
});

// Add a virtual property for thumbnails
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } }; // Enable virtuals for JSON responses

// Car Schema with predefined feature options
const CarSchema = new Schema(
    {
        name: { type: String, required: true },
        images: [ImageSchema], // Reference ImageSchema here
        body: { type: String, required: true },
        make: { type: String, required: true },
        model: { type: String, required: true },
        transmission: { type: String, required: true },
        fuelType: { type: String, required: true },
        engine: { type: String, required: true },
        year: { type: Number, required: true },
        mileage: { type: String, required: true },
        drive: { type: String, required: true },
        exteriorColor: { type: String, required: true },
        interiorColor: { type: String, required: true },
        registered: { type: String, default: 'N/A' },
        history: { type: String, default: 'N/A' },
        stockId: { type: String, required: true },
        vin: { type: String, required: true },
        features: {
            comfort: [{
                type: String,
                enum: ['A/C: Front', 'Backup Camera', 'Cruise Control', 'Navigation'],
                default: undefined
            }],
            entertainment: [{
                type: String,
                enum: ['MP3 Player', 'Premium Audio', 'AM/FM Stereo', 'DVD System'],
                default: undefined
            }],
            safety: [{
                type: String,
                enum: ['Airbag: Driver', 'Airbag: Passenger', 'Security System', 'Antilock Brakes'],
                default: undefined
            }],
            seats: [{
                type: String,
                enum: ['Heated Seats', 'Power Seats', 'Bucket Seats', 'Memory Seats'],
                default: undefined
            }]
        },
        price: {
            original: { type: Number, required: true },
            msrp: { type: Number, required: true },
        },
        sellerNote: { type: String, required: true },
        location: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        usageType: { 
            type: String, 
            enum: ['Rental', 'Uber', 'Both', 'None'], 
            default: 'None' 
        }, // New field added
    },
    { timestamps: true, ...opts } // Pass timestamps and virtuals config
);

// Export the Car model
module.exports = mongoose.model('Car', CarSchema);



// const mongoose = require('mongoose');
// const { Schema } = mongoose; // Import Schema explicitly

// const ImageSchema = new Schema({
//     url: String,
//     filename: String,
// });

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

// const opts = { toJSON: { virtuals: true } };

// const CarSchema = new Schema(
//     {
//         name: { type: String, required: true },
//         images: [ImageSchema],
//         body: { type: String, required: true },
//         make: { type: String, required: true },
//         model: { type: String, required: true },
//         transmission: { type: String, required: true },
//         fuelType: { type: String, required: true },
//         engine: { type: String, required: true },
//         year: { type: Number, required: true },
//         mileage: { type: String, required: true },
//         drive: { type: String, required: true },
//         exteriorColor: { type: String, required: true },
//         interiorColor: { type: String, required: true },
//         registered: { type: String, default: 'N/A' },
//         history: { type: String, default: 'N/A' },
//         stockId: { type: String, required: true },
//         vin: { type: String, required: true },
//         features: {
//             comfort: [{ type: String }],
//             entertainment: [{ type: String }],
//             safety: [{ type: String }],
//             seats: [{ type: String }],
//         },
//         price: {
//             original: { type: Number, required: true },
//             msrp: { type: Number, required: true },
//         },
//         sellerNote: { type: String, required: true },
//         location: String,
//         author: {
//             type: Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         usageType: { 
//             type: String, 
//             enum: ['Rental', 'Uber', 'Both', 'None'], 
//             default: 'None' 
//         },
//     },
//     { timestamps: true, ...opts }
// );

// module.exports = mongoose.model('Car', CarSchema);
