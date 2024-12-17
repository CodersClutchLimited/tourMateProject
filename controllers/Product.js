const Product = require('../models/Product')
const { cloudinary } = require("../cloudinary");


module.exports.Adverts = async (req, res) => {
    const products = await Product.find({});
    res.render('products/adverts', { products });
};

module.exports.showProducts = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {e
        req.flash('error', 'product not found!');
        return res.redirect('/products');
    }
    res.render('products/show', { product });
};

module.exports.renderNewProductForm = (req, res) => {
    res.render('products/new');
};

module.exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    product.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.author = req.user._id;
    await product.save();
    req.flash('success', 'Successfully added to listing');
    res.redirect(`/products/${product._id}`);
};

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product }, { new: true })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
    await product.save()

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            //to remove it from cloudinary
            await cloudinary.uploader.destroy(filename)
        }
        //removing from mongo
        await product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated product!')
    res.redirect(`/products/${product._id}`)
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/products');
    }
    res.render('products/edit', { product });
};

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the product!');
    res.redirect('/products');
};



// CATEGORY CONTROLLERS:

module.exports.computers = async (req, res) => {
    const products = await Product.find()
    res.render('products/categories/computer', {products})
}

module.exports.smartphones = async(req, res) => {
    const products = await Product.find()
    res.render('products/categories/smartphone')
}

module.exports.gaming = async(req, res) => {
    const products = await Product.find()
    res.render('products/categories/gaming')
}

module.exports.tv = async(req, res) => {
    const products = await Product.find()
    res.render('products/categories/tv')
}

module.exports.watches = async(req, res) => {
    const products = await Product.find()
    res.render('products/categories/watches')
}

module.exports.tablet = async(req, res) => {
    const product = await Product.find()
    res.render('products/categories/tablet')
}

