const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ID
    name: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    sinkType: { type: String },
    shape: { type: String },
    sizeDimension: { type: String },
    usageApplication: { type: String },
    finishType: { type: String },
    positionOfDrainer: { type: String },
    weight: { type: Number },
    productDescription: { type: String },
    images: [{ type: String }], // Array of strings to store image URLs
    price: { type: Number, required: true }, // Added price
    category: { type: String, required: true }, // Added category
    createdAt: { type: Date, default: Date.now }, // Created timestamp
    updatedAt: { type: Date, default: Date.now }  // Updated timestamp
});

// Export the model
module.exports = mongoose.model('Product', productSchema);
