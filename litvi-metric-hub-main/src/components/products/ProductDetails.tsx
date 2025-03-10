import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, ShoppingBag, Star, TrendingUp, Shield, Calendar, Tag } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ProductDetails = () => {
    const [products, setProducts] = useState([]); // Ensure this is initialized if you're using setProducts after deleting
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/admin/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                console.log("Deleting product with ID:", id); // Use the id from useParams
                await axios.delete(`http://localhost:5002/api/admin/products/${id}`);
                toast.success('Product deleted successfully');
                navigate('/admin/products'); // Redirect to product list after successful deletion

            } catch (error) {
                console.error('Error deleting product:', error.response?.data || error.message);
                toast.error('Failed to delete product.');
            }
        }
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="glass rounded-xl card-shadow p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
                <p className="text-slate-600 mb-6">The product you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
                <ArrowLeft size={18} className="mr-1" />
                Back to Products
            </button>

            <div className="glass rounded-xl card-shadow overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Product Image Section */}
                    <div className="lg:w-2/5 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
                        <div className="h-80 w-80 rounded-xl overflow-hidden bg-white shadow-lg">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={getImageUrl(product.images[0])}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                    <Package size={64} className="text-slate-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="lg:w-3/5 p-8">
                        <div className="mb-4 flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
                                <div className="text-slate-600 flex items-center">
                                    <Tag size={16} className="mr-1" />
                                    {product.category}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-3xl font-bold text-blue-600">{formatCurrency(product.price)}</div>
                            <div className="text-sm text-slate-500">ID: {product._id}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Material */}
                            <div className="flex items-center p-4 rounded-lg bg-blue-50">
                                <ShoppingBag className="text-blue-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Material</div>
                                    <div className="text-lg font-semibold">{product.material || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="flex items-center p-4 rounded-lg bg-purple-50">
                                <Star className="text-purple-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Color</div>
                                    <div className="text-lg font-semibold">{product.color || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Weight */}
                            <div className="flex items-center p-4 rounded-lg bg-emerald-50">
                                <TrendingUp className="text-emerald-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Weight</div>
                                    <div className="text-lg font-semibold">{product.weight ? `${product.weight} kg` : 'N/A'}</div>
                                </div>
                            </div>
                            {/* Sink Type */}
                            <div className="flex items-center p-4 rounded-lg bg-amber-50">
                                <Shield className="text-amber-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Sink Type</div>
                                    <div className="text-lg font-semibold">{product.sinkType || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Shape */}
                            <div className="flex items-center p-4 rounded-lg bg-teal-50">
                                <Shield className="text-teal-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Shape</div>
                                    <div className="text-lg font-semibold">{product.shape || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Size Dimension */}
                            <div className="flex items-center p-4 rounded-lg bg-lime-50">
                                <Shield className="text-lime-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Size Dimension</div>
                                    <div className="text-lg font-semibold">{product.sizeDimension || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Usage Application */}
                            <div className="flex items-center p-4 rounded-lg bg-red-50">
                                <Shield className="text-red-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Usage Application</div>
                                    <div className="text-lg font-semibold">{product.usageApplication || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Finish Type */}
                            <div className="flex items-center p-4 rounded-lg bg-indigo-50">
                                <Shield className="text-indigo-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Finish Type</div>
                                    <div className="text-lg font-semibold">{product.finishType || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Position of Drainer */}
                            <div className="flex items-center p-4 rounded-lg bg-fuchsia-50">
                                <Shield className="text-fuchsia-600 mr-4" size={24} />
                                <div>
                                    <div className="text-sm text-slate-500">Position of Drainer</div>
                                    <div className="text-lg font-semibold">{product.positionOfDrainer || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                            <h3 className="text-lg font-semibold mb-2">Product Timeline</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <Calendar size={16} className="text-slate-400 mr-2" />
                                    <div>
                                        <div className="text-sm text-slate-500">Created</div>
                                        <div className="font-medium">{formatDate(product.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Calendar size={16} className="text-slate-400 mr-2" />
                                    <div>
                                        <div className="text-sm text-slate-500">Last Updated</div>
                                        <div className="font-medium">{formatDate(product.updatedAt)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                            <p className="text-slate-700">{product.productDescription || 'No description available.'}</p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
                            >
                                Edit Product
                            </button>
                            <button
                                onClick={handleDelete}
                                className="border border-slate-300 hover:bg-slate-100 text-slate-700 py-2 px-6 rounded-lg transition-colors"
                            >
                                Delete Product
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
