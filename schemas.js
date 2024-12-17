//===npm i joi===>Joi validates data against schemas.===//
//== Joi for server side validation ==//
const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')


//=for escaping html in text-inputs=-requirements-->npm i sanitize-html
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension)
// ==============================================================


module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        amenities: Joi.array().items(Joi.string().valid(
            'Wi-Fi', 'Parking', 'Pets Allowed', 'Swimming Pool', 'Air Conditioning',
            'Laundry', 'BBQ Area', 'Fire Pits', 'Hot Tub', 'Gym', 'Electric Hookups',
            'Water Hookups', 'Showers', 'Bathrooms', 'Picnic Area', 'Playground'
        )),
        guests: Joi.number().required().min(1), // Validate number of guests
        bedrooms: Joi.number().required().min(1), // Validate number of bedrooms
        beds: Joi.number().required().min(1), // Validate number of beds
        bathrooms: Joi.number().required().min(1), // Validate number of bathrooms
        category: Joi.string().valid('Apartments', 'Houses', 'Condos', 'Studios', 'Townhouses', 'Lofts', 'Duplexes', 'Penthouses', 'Villas', 'Cabins', 'Cottages', 'Homes', 'Mansions', 'Farms', 'Land', 'Offices', 'Retail Spaces', 'Warehouses', 'Garages', 'Events', 'Luxury Rentals', 'Vacation Rentals', 'Short-Term Rentals', 'Long-Term Rentals', 'Pet-Friendly Rentals', 'Senior Living', 'Student Housing', 'Commercial Properties', 'Mixed-Use Properties', 'Investment Properties', 'New Constructions', 'Historic Homes', 'Furnished Rentals', 'Unfurnished Rentals', 'Shared Housing', 'Sublets', 'Room Rentals', 'Retirement Communities').required(),
        // availableFrom: Joi.date().required(),
        // availableTo: Joi.date().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.carSchema = Joi.object({
    car: Joi.object({
        name: Joi.string().required().escapeHTML(),
        body: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        make: Joi.string().required().escapeHTML(),
        model: Joi.string().required().escapeHTML(),
        transmission: Joi.string().required().escapeHTML(),
        fuelType: Joi.string().required().escapeHTML(),
        engine: Joi.string().required(),
        year: Joi.number().required(),
        mileage: Joi.string().required(),
        drive: Joi.string().required(),
        exteriorColor: Joi.string().required(),
        interiorColor: Joi.string().required(),
        stockId: Joi.string().required(),
        vin: Joi.string().required(),
        usageType: Joi.string()
            .valid('Rental', 'Uber', 'Both', 'None')
            .default('None')
            .escapeHTML(),
        features: Joi.object({
            comfort: Joi.array().items(
                Joi.string()
                    .valid('A/C: Front', 'Backup Camera', 'Cruise Control', 'Navigation')
                    .escapeHTML()
            ).default([]),
            entertainment: Joi.array().items(
                Joi.string()
                    .valid('MP3 Player', 'Premium Audio', 'AM/FM Stereo', 'DVD System')
                    .escapeHTML()
            ).default([]),
            safety: Joi.array().items(
                Joi.string()
                    .valid('Airbag: Driver', 'Airbag: Passenger', 'Security System', 'Antilock Brakes')
                    .escapeHTML()
            ).default([]),
            seats: Joi.array().items(
                Joi.string()
                    .valid('Heated Seats', 'Power Seats', 'Bucket Seats', 'Memory Seats')
                    .escapeHTML()
            ).default([]),
        }).default({
            comfort: [],
            entertainment: [],
            safety: [],
            seats: []
        }),
        price: Joi.object({
            original: Joi.number().required(),
            msrp: Joi.number().required()
        }).required(),
        sellerNote: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});


// module.exports.carSchema = Joi.object({
//     car: Joi.object({
//         name: Joi.string().required().escapeHTML(),
//         body: Joi.string().required().escapeHTML(),
//         location: Joi.string().required().escapeHTML(),
//         make: Joi.string().required().escapeHTML(),
//         model: Joi.string().required().escapeHTML(),
//         transmission: Joi.string().required().escapeHTML(),
//         fuelType: Joi.string().required().escapeHTML(),
//         engine: Joi.string().required(),
//         year: Joi.number().required(),
//         mileage: Joi.string().required(),
//         drive: Joi.string().required(),
//         exteriorColor: Joi.string().required(),
//         interiorColor: Joi.string().required(),
//         stockId: Joi.string().required(),
//         vin: Joi.string().required(),
//         usageType: Joi.string()
//             .valid('Rental', 'Uber', 'Both', 'None')
//             .default('None')
//             .escapeHTML(),
//         features: Joi.object({
//             comfort: Joi.array().items(Joi.string().escapeHTML()).default([]),
//             entertainment: Joi.array().items(Joi.string().escapeHTML()).default([]),
//             safety: Joi.array().items(Joi.string().escapeHTML()).default([]),
//             seats: Joi.array().items(Joi.string().escapeHTML()).default([])
//         }).default({
//             comfort: [],
//             entertainment: [],
//             safety: [],
//             seats: []
//         }),
//         price: Joi.object({
//             original: Joi.number().required(),
//             msrp: Joi.number().required()
//         }).required(),
//         sellerNote: Joi.string().required().escapeHTML()
//     }).required(),
//     deleteImages: Joi.array()
// });



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})

