import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios'; // Import axios

export function ProductTable() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/admin/products'); // Adjust URL if needed
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request made but no response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            toast.error('Failed to fetch products.');
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5002/api/admin/products/${productId}`);
                setProducts(products.filter(product => product._id !== productId)); 
                toast.success('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product:', error.response?.data || error.message);
                toast.error('Failed to delete product.');
            }
        }
    };
    
    
    const handleEdit = (product) => {
        navigate(`/admin/products/edit/${product._id}`);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "/placeholder.jpg";
        return imagePath.startsWith("http") ? imagePath : `http://localhost:5002/uploads/${imagePath}`;
    };


    return (
        <div className="glass rounded-xl card-shadow">
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                    <div className="relative w-full sm:w-auto flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                            onClick={() => navigate('/admin/products/new')}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Product</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Name</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Category</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Price</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Material</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Color</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Sink Type</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Shape</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Weight</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Last Updated</th>
                            <th className="text-right py-4 px-6 text-sm font-medium text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr
                                key={product._id}
                                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden">
                                            {/* Image Handling - ADDED THIS SECTION */}
                                            <img src={getImageUrl(product.images[0])}  className="h-full w-full object-cover" />


                                            {/* END OF ADDED SECTION */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.name}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.category}</td>
                                <td className="py-4 px-6 text-sm text-slate-800 font-medium">{formatCurrency(product.price)}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.material}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.color}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.sinkType}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.shape}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{product.weight} kg</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{formatDate(product.updatedAt)}</td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="p-1 text-slate-600 hover:text-blue-600 transition-colors"
                                            onClick={() => navigate(`/admin/products/${product._id}`)}
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            className="p-1 text-slate-600 hover:text-amber-600 transition-colors"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            className="p-1 text-slate-600 hover:text-red-600 transition-colors"
                                            onClick={() => handleDelete(product._id)}
                                            >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={11} className="py-10 text-center text-slate-500">
                                    No products found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
