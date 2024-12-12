const Campground = require('../models/campground')


function getCategories(){
    return Campground.schema.path('category').enumValues;
}


module.exports = getCategories;