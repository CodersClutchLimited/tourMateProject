const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random()* array.length)]

const seeDB = async ()=>{
    await Campground.deleteMany({})
    for(let i = 0; i < 55; i++){
        const random55 = Math.floor(Math.random()*55)
        const price = Math.floor(Math.random()*20)  + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '66c875482ecc3dee4c057e63',
            location: `${cities[random55].city}, ${cities[random55].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur alias vero quo deserunt suscipit sapiente, velit quos, cum optio a labore esse iste rerum architecto incidunt molestias voluptates sunt autem!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random55].longitude,
                    cities[random55].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/darsby1iv/image/upload/v1724612755/YelpCamp/ykfcdjfq7dcqkw4t8yt4.jpg',
                    filename: 'YelpCamp/ykfcdjfq7dcqkw4t8yt4'
                },
                {
                    url: 'https://res.cloudinary.com/darsby1iv/image/upload/v1724612755/YelpCamp/bb5mqo0vueopfarb4eep.jpg',
                    filename: 'YelpCamp/bb5mqo0vueopfarb4eep'
                }
            ]
        })
        await camp.save();
    }
}

seeDB().then(()=>{
    mongoose.connection.close()
});