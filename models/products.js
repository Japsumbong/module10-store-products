const mongoose = require('mongoose');

/*
  Product Schema
  This schema defines the structure of a product document
  for the e-commerce store module.
*/
const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      trim: true
    },

    storeName: {
      type: String,
      required: true,
      trim: true
    },

    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    productName: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

// Export the Product model so it can be used in server routes
module.exports = mongoose.model('Product', productSchema);
