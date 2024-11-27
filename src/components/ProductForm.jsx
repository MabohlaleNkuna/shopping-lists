import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/slices/productSlice';

const ProductForm = ({ onClose }) => {
  const { userData } = useSelector((state) => state?.user) || {};
  const [products, setProducts] = useState([{ name: '', quantity: '', notes: '', category: '', images: '' }]);
  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddRow = () => {
    setProducts([...products, { name: '', quantity: '', notes: '', category: '', images: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData?.id) {
      console.error('User data is not available.');
      return;
    }

    const productData = products.map(product => ({
      ...product,
      quantity: parseInt(product.quantity, 10),
      images: product.images.split(','),
      userId: userData.id,
    }));
    
    dispatch(addProduct(productData));
    setProducts([{ name: '', quantity: '', notes: '', category: '', images: '' }]); // Reset form
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block', zIndex: 1 }}>
      <div className="modal-content" style={{ margin: '15% auto', padding: '20px', width: '80%' }}>
        <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
          &times;
        </span>
        <h2>Add New Products</h2>
        <form onSubmit={handleSubmit}>
          {products.map((product, index) => (
            <div key={index}>
              <label>
                Name:
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  value={product.notes}
                  onChange={(e) => handleChange(index, 'notes', e.target.value)}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  required
                />
              </label>
              <label>
                Images:
                <input
                  type="text"
                  value={product.images}
                  onChange={(e) => handleChange(index, 'images', e.target.value)}
                />
              </label>
              {products.length > 1 && (
                <button type="button" onClick={() => handleRemoveRow(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddRow}>
            Add Another Product
          </button>
          <button type="submit">Save Products</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
