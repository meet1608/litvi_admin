
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/utils/mockData';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string }) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const isEditing = !!product;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    inventory: 0,
    status: 'draft' as 'draft' | 'active' | 'archived',
    image: ''
  });
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        status: product.status,
        image: product.image || ''
      });
    }
  }, [product]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'status') {
      setFormData(prev => ({
        ...prev,
        [name]: value as 'draft' | 'active' | 'archived'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.price <= 0) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const productData = {
      ...formData,
      ...(isEditing ? { id: product.id } : {})
    };
    
    onSubmit(productData);
    toast.success(`Product ${isEditing ? 'updated' : 'created'} successfully`);
    navigate('/admin/products');
  };
  
  return (
    <form onSubmit={handleSubmit} className="glass card-shadow rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Product Name <span className="text-red-500">*</span>
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
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                placeholder="Enter category"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Inventory <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                min="0"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                placeholder="Enter image URL"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors duration-300"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg btn-hover"
          >
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </form>
  );
}
