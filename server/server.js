const express = require('express');
const cors = require('cors');

// Initialize database connection
require('../models/db');

// Import Product model
const Product = require('../models/products');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static frontend files
app.use(express.static('public'));

// Root test route
app.get('/', (req, res) => {
  res.send('API running');
});

/*
  CREATE a new product
*/
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  READ all products (GetAll)
*/
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
  READ one product by productId
*/
app.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  UPDATE product by productId
*/
app.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  DELETE product by productId
*/
app.delete('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      productId: req.params.productId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server only when run directly
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
