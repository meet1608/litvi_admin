const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToS3 = async (file) => {
    if (!process.env.AWS_S3_BUCKET) {
        console.error("❌ AWS_S3_BUCKET is not defined in environment variables.");
        throw new Error("AWS_S3_BUCKET is missing");
    }

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `products/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    const data = await s3.upload(params).promise();
    return data.Location; // Returns the S3 URL of the uploaded file
};


// **Create Product (POST)**
router.post('/products', upload.array('images', 10), async (req, res) => {
    try {
        const { name, material, color, sinkType, shape, sizeDimension, usageApplication, finishType, positionOfDrainer, weight, productDescription, price, category } = req.body;
        
        const imageUrls = await Promise.all(req.files.map(file => uploadToS3(file)));

        const newProduct = new Product({
            name,
            material,
            color,
            sinkType,
            shape,
            sizeDimension,
            usageApplication,
            finishType,
            positionOfDrainer,
            weight: parseFloat(weight),
            productDescription,
            images: imageUrls,
            price: parseFloat(price),
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.toString() });
    }
});

// **Get All Products (GET)**
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.toString() });
    }
});

// **Get Product by ID (GET)**
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.toString() });
    }
});

// **Update Product (PUT)**
router.put('/products/:id', upload.array('images', 10), async (req, res) => {
    try {
        console.log('🔹 Request Body:', req.body);

        const { name, material, color, sinkType, shape, sizeDimension, usageApplication, finishType, positionOfDrainer, weight, productDescription, price, category } = req.body;
        
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const parsedWeight = weight && !isNaN(weight) ? parseFloat(weight) : 0;
        const parsedPrice = price && !isNaN(price) ? parseFloat(price) : 0;

        let imageUrls = product.images; // Keep old images if no new ones are uploaded
        if (req.files && req.files.length > 0) {
            imageUrls = await Promise.all(req.files.map(file => uploadToS3(file)));
        }

        product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            material,
            color,
            sinkType,
            shape,
            sizeDimension,
            usageApplication,
            finishType,
            positionOfDrainer,
            weight: parsedWeight,
            productDescription,
            images: imageUrls,
            price: parsedPrice,
            category
        }, { new: true });

        res.status(200).json(product);
    } catch (error) {
        console.error('❌ Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.toString() });
    }
});


// **Delete Product (DELETE)**
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete images from S3
        for (const imageUrl of product.images) {
            const key = new URL(imageUrl).pathname.substring(1); // Correctly extracts the S3 object key
            const params = { Bucket: process.env.AWS_S3_BUCKET, Key: key };
            await s3.deleteObject(params).promise();
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.toString() });
    }
});



module.exports = router;
