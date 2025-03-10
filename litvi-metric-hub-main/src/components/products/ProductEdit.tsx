import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const ProductEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        price: '',
        category: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/admin/products/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Failed to fetch product.');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5002/api/admin/products/${id}`, formData);
            toast.success('Product updated successfully');
            navigate('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error(error.response?.data?.message || 'Failed to update product.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                        Color
                    </label>
                    <select
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                    >
                        <option value="">Select Color</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Gray">Gray</option>
                        <option value="Beige">Beige</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Brown">Brown</option>
                        <option value="Other">Other</option>
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
                        <option value="Single Bowl">Single Bowl</option>
                        <option value="Double Bowl">Double Bowl</option>
                        <option value="Apron Front">Apron Front</option>
                        <option value="Corner">Corner</option>
                        <option value="Other">Other</option>
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
                        <option value="Rectangular">Rectangular</option>
                        <option value="Square">Square</option>
                        <option value="Round">Round</option>
                        <option value="Oval">Oval</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Size/Dimension</label>
                    <input
                        type="text"
                        name="sizeDimension"
                        value={formData.sizeDimension || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Usage/Application</label>
                    <input
                        type="text"
                        name="usageApplication"
                        value={formData.usageApplication || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
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
                        <option value="Polished">Polished</option>
                        <option value="Matte">Matte</option>
                        <option value="Brushed">Brushed</option>
                        <option value="Satin">Satin</option>
                        <option value="Other">Other</option>
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
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                        <option value="Center">Center</option>
                        <option value="None">None</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Weight</label>
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Description</label>
                    <textarea
                        name="productDescription"
                        value={formData.productDescription || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEdit;
