import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Addproducts = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        material: '',
        color: '',
        sinkType: '',
        shape: '',
        sizeDimension: '',
        usageApplication: '',
        finishType: '',
        positionOfDrainer: '',
        weight: '',
        productDescription: '',
        price: '', // Added price
        category: '', // Added category
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        console.log("handleChange triggered");  // Debugging
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log("handleChange completed. New formData:", { ...formData, [name]: value });  // Debugging
    };

    const handleImageChange = (e) => {
        console.log("handleImageChange triggered");  // Debugging
        const files = Array.from(e.target.files);
        setImages(files);
        console.log("handleImageChange completed. Selected images:", files);  // Debugging
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formDataWithImages = new FormData();
    
            // Append form data fields
            Object.keys(formData).forEach((key) => {
                formDataWithImages.append(key, formData[key]);
            });
    
            // Append images
            images.forEach((image) => {
                formDataWithImages.append("images", image);
            });
    
            // Upload directly to /api/admin/products
            const response = await axios.post("http://localhost:5002/api/admin/products", formDataWithImages, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            toast.success("Product created successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error uploading images or creating product:", error.response?.data || error.message);
            toast.error("Error creating product");
        }
    };
    
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="glass card-shadow rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="space-y-8">
                    <div className="border-b border-slate-200 pb-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">
                            New Product
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Material <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="material"
                                    value={formData.material}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Material</option>
                                    <option value="Quartz">Quartz</option>
                                    <option value="Steel">Steel</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Color <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Color</option>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Green">Green</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Pink">Pink</option>
                                    <option value="Turquoise">Turquoise</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Sink Type
                                </label>
                                <select
                                    name="sinkType"
                                    value={formData.sinkType}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Sink Type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Shape
                                </label>
                                <select
                                    name="shape"
                                    value={formData.shape}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Shape</option>
                                    <option value="Round">Round</option>
                                    <option value="Square">Square</option>
                                    <option value="Rectangular">Rectangular</option>
                                    <option value="Oval">Oval</option>
                                    <option value="Triangular">Triangular</option>
                                    <option value="Hexagonal">Hexagonal</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Size/Dimension (in cm)
                                </label>
                                <input
                                    type="text"
                                    name="sizeDimension"
                                    value={formData.sizeDimension}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="e.g., 100x100x100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="Enter product category"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="Enter product price"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Usage/Application
                                </label>
                                <select
                                    name="usageApplication"
                                    value={formData.usageApplication}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Usage/Application</option>
                                    <option value="Home">Home</option>
                                    <option value="Workplace">Workplace</option>
                                    <option value="Farmhouse">Farmhouse</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Finish Type
                                </label>
                                <select
                                    name="finishType"
                                    value={formData.finishType}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Finish Type</option>
                                    <option value="Glossy">Glossy</option>
                                    <option value="Matte">Matte</option>
                                    <option value="Satin">Satin</option>
                                    <option value="Polished">Polished</option>
                                    <option value="Brushed">Brushed</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Position Of Drainer
                                </label>
                                <select
                                    name="positionOfDrainer"
                                    value={formData.positionOfDrainer}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                >
                                    <option value="">Select Position Of Drainer</option>
                                    <option value="Center">Center</option>
                                    <option value="Right">Right</option>
                                    <option value="Left">Left</option>
                                    <option value="Top Corner">Top Corner</option>
                                    <option value="Bottom Corner">Bottom Corner</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Weight (in kg)
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="e.g., 8.7"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Product Description
                                </label>
                                <textarea
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                    placeholder="Enter product description"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Upload Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg transition-colors"
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Addproducts;
