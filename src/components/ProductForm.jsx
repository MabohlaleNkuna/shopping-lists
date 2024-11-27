import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../store/slices/productSlice';

const ProductForm = ({ onClose, product }) => {
  const { userData } = useSelector((state) => state?.user) || {};
  const [formProduct, setFormProduct] = useState({
    name: '',
    quantity: '',
    notes: '',
    category: '',
    images: '',
  });
  const dispatch = useDispatch();

  // If a product is passed for editing, pre-fill the form
  useEffect(() => {
    if (product) {
      setFormProduct({
        name: product.name || '',
        quantity: product.quantity || '',
        notes: product.notes || '',
        category: product.category || '',
        images: product.images.join(', ') || '',
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormProduct({
      ...formProduct,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData?.id) {
      console.error('User data is not available.');
      return;
    }

    const updatedProduct = {
      ...formProduct,
      quantity: parseInt(formProduct.quantity, 10),
      images: formProduct.images.split(','),
      userId: userData.id,
    };

    if (product) {
      // If a product is being edited, dispatch the update action
      dispatch(updateProduct({ id: product.id, updates: updatedProduct }));
    } else {
      // Otherwise, add a new product
      dispatch(addProduct([updatedProduct]));
    }

    setFormProduct({
      name: '',
      quantity: '',
      notes: '',
      category: '',
      images: '',
    }); // Reset form
    onClose(); // Close the form
  };

  return (
    <div className="modal" style={{ display: 'block', zIndex: 1 }}>
      <div className="modal-content" style={{ margin: '15% auto', padding: '20px', width: '80%' }}>
        <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
          &times;
        </span>
        <h2>{product ? 'Update Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={formProduct.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={formProduct.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              required
            />
          </label>
          <label>
            Notes:
            <textarea
              value={formProduct.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={formProduct.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
            />
          </label>
          <label>
            Images (comma-separated):
            <input
              type="text"
              value={formProduct.images}
              onChange={(e) => handleChange('images', e.target.value)}
            />
          </label>
          <button type="submit">{product ? 'Update Product' : 'Save Product'}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
