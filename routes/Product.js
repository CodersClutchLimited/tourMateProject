const express = require('express');
const router = express.Router();
const product = require('../controllers/Product')
const catchAsync = require('../Utils/catchAsync');
const ExpressError = require('../Utils/ExpressError');
const { isLoggedIn, isLister, validateProduct } = require('../middleware');

const { storage } = require('../cloudinary/index');
const { cloudinary } = require('../cloudinary/index');


const multer = require('multer');
const upload = multer({ storage })



router.route('/')
    .get(catchAsync(product.Adverts))
    .post(isLoggedIn, upload.array('image'), validateProduct, catchAsync(product.addProduct));



    // CATEGORY ROUTES
    // =======================================================================
    router.get('/computers', catchAsync(product.computers))
    router.get('/smartphones', catchAsync(product.smartphones))
    router.get('/watches', catchAsync(product.watches))
    router.get('/tv', catchAsync(product.tv))
    router.get('/gaming', catchAsync(product.gaming))
    router.get('/tablets', catchAsync(product.tablet))
    // =======================================================================


router.get('/new', isLoggedIn, product.renderNewProductForm);




router.route('/:id')
    .get(catchAsync(product.showProducts))
    .put(isLoggedIn, upload.array('image'), validateProduct, catchAsync(product.updateProduct))
    .delete(isLoggedIn, catchAsync(product.deleteProduct));

router.get('/:id/edit', isLoggedIn, catchAsync(product.renderEditForm));


module.exports = router;
