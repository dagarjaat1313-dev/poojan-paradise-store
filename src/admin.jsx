import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase } from './supabase';
import './admin.css';

function Admin() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState('Checking access…');
  const [tab, setTab] = useState('Dashboard');
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Check user auth and role
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setStatus('Not logged in');
          return;
        }
        
        setUser(session.user);
        
        // Check if user is admin in the database
        const { data: adminData, error } = await supabase
          .from('admins')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (error || !adminData) {
          setStatus('Access denied - not an admin');
          setRole('user');
          return;
        }

        setRole(adminData.role);
        setStatus('Access granted');
      } catch (error) {
        console.error('Auth check failed:', error);
        setStatus('Error checking auth');
      }
    };

    checkAuth();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    if (role === 'admin') {
      loadProducts();
    }
  }, [role]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `product-images/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', publicUrl);
      setUploadError('');
      
      // Reset input
      e.target.value = '';
      
      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: formData.get('name'),
          price: parseFloat(formData.get('price')),
          image: formData.get('image'),
          description: formData.get('description'),
          created_at: new Date()
        }]);

      if (error) throw error;

      setStatus('Product added successfully');
      e.target.reset();
      
      // Reload products
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to add product:', error);
      setUploadError(`Failed to add product: ${error.message}`);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== id));
      setStatus('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      setUploadError(`Failed to delete product: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div className="admin-container">
        <div className="status-message error">{status}</div>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="status-message error">Access Denied - Admin only</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Poojan Paradise Admin</h1>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      </header>

      <div className="status-message success">{status}</div>

      <div className="tabs">
        <button 
          className={`tab-btn ${tab === 'Dashboard' ? 'active' : ''}`}
          onClick={() => setTab('Dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${tab === 'AddProduct' ? 'active' : ''}`}
          onClick={() => setTab('AddProduct')}
        >
          Add Product
        </button>
      </div>

      {tab === 'Dashboard' && (
        <div className="tab-content">
          <h2>Products</h2>
          <div className="products-list">
            {products.length === 0 ? (
              <p>No products yet</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-item">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="product-thumb" />
                  )}
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">₹{product.price}</p>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === 'AddProduct' && (
        <div className="tab-content">
          <h2>Add New Product</h2>
          {uploadError && <div className="error-message">{uploadError}</div>}
          
          <form onSubmit={handleAddProduct} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input 
                type="number" 
                id="price"
                name="price" 
                step="0.01"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Product Image</label>
              <input 
                type="file" 
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <span className="uploading">Uploading...</span>}
              <input 
                type="hidden"
                name="image"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description" 
                rows="4"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={uploading}
            >
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('admin-root')).render(<Admin />);
