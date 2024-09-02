// src/components/ProductDetails.js
import React from 'react';


const ProductDetails = ({ product, onClose, onAddToShoppingList }) => {
  if (!product) return null;

  const handleAddToShoppingList = () => {
    if (onAddToShoppingList) {
      onAddToShoppingList(product);
    }
  };

  return (
    <div className="product-details-overlay">
      <div className="product-details-card">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{product.name}</h2>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        {/* Add more fields as needed */}
        <button className="add-to-shopping-list-btn" onClick={handleAddToShoppingList}>
          Add to Shopping List
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
