const Car = require('../models/car');
const {cloudinary} = require("../cloudinary");


module.exports.index = async (req, res) => {
    try {
        const cars = await Car.find({}); // Fetch all cars from the database
        res.render('cars/car', { cars }); // Pass cars to the template
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong!');
        res.redirect('/cars');
    }
};


module.exports.renderNewForm = (req, res)=>{
    res.render('cars/new');
}

module.exports.createCar = async (req, res, next) => {
    try {
        console.log('Body:', req.body); // Debugging
        console.log('Files:', req.files); // Debugging

        const car = new Car(req.body.car);
        car.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        car.author = req.user._id;

        await car.save();
        req.flash('success', 'Successfully added a new car!');
        res.redirect(`/cars/${car._id}`);
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error adding car!');
        res.redirect('/cars/new');
    }
};


module.exports.showCar = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id)
        .populate('author');

    if (!car) {
        req.flash('error', 'Cannot find that car!');
        return res.redirect('/car');
    }

    const isHost = req.user && car.author.equals(req.user._id);

    res.render('cars/show', {
        car,
        isHost
    });
};

module.exports.renderEditForm = async(req, res)=>{
    const { id } = req.params;
    const car = await Car.findById(id)
    if(!car){
        req.flash('error', 'cannot find that car!');
        return res.redirect('/cars');
    }


    res.render('cars/edit', {car})
}

module.exports.updateCar = async (req, res)=>{
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, {...req.body.car})

    car.set(req.body.car);
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    car.images.push(...imgs);

    await car.save()
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            //to remove it from cloudinary
            await cloudinary.uploader.destroy(filename)
        }
        //removing from mongo
        await car.updateOne({$pull:{images: {filename: {$in: req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated car!')
    res.redirect(`/cars/${car._id}`)
}

module.exports.deleteCar = async (req, res)=>{
    const {id} = req.params;
    await Car.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted car!')
    res.redirect('/cars')
}