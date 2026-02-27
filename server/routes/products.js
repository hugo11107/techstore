// Import necessary modules
const express = require('express');
const router = express.Router();

// Sample data for products
let products = [
    { id: 1, name: 'Product A', price: 100, description: 'Description for product A' },
    { id: 2, name: 'Product B', price: 200, description: 'Description for product B' },
    { id: 3, name: 'Product C', price: 150, description: 'Description for product C' }
];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = { id: products.length + 1, name, price, description };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update an existing product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    const { name, price, description } = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    res.json(product);
});

// Delete a product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;