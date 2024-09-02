import React from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Product Details</h2>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        {/* Add more product details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
