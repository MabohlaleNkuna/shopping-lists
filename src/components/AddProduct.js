// src/components/AddProductModal.js
import React, { useState } from 'react';
import './AddProductModal.css';

const AddProduct = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleSubmit = () => {
    if (productName && productPrice) {
      onAddProduct({
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
      });
      onClose();
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>X</button>
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    ) : null
  );
};

export default AddProduct;

