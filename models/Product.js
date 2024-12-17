const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductReview = require('../models/productReview')


const ImageSchema = new Schema({
  url: String,
  filename: String
})




ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } }


// Define the schema
const productSchema = new mongoose.Schema({
  images: [ImageSchema],
  author: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: 'ProductReview'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: [String], // Array to store multiple colors
    required: true
  },
  storageSize: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    default: null, // Optional sale price, if any
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [String], // Array of strings for tags, allowing multiple tags per product
    default: []
  },
  category: {
    type: String,
    enum: ['computers', 'smartphones', 'watches', 'tv', 'tablets', 'gaming'],
    required: true
  },
  size: {
    type: [String],
  },
inStock: {
  type: Boolean,
  required: true
},
outStock: {
  type: Boolean,
  required: true
},
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, opts);







// Add a pre-save hook to update the `updatedAt` field
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();

});




productSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await ProductReview.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
});

// Add the post middleware hook here
productSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    // Remove references to the deleted reviews in all campgrounds
    await Product.updateMany(
      { reviews: { $in: doc.reviews } },
      { $pull: { reviews: { $in: doc.reviews } } }
    );
  }
});


// Compile and export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
