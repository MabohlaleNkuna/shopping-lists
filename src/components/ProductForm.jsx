import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../store/slices/productSlice';

const ProductForm = ({ product, onClose }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [quantity, setQuantity] = useState(product ? product.quantity : '');
  const [notes, setNotes] = useState(product ? product.notes : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const [images, setImages] = useState(product ? product.images.join(',') : '');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, quantity, notes, category, images: images.split(',') };
    if (product) {
      dispatch(updateProduct({ id: product.id, updates: productData }));
    } else {
      dispatch(addProduct(productData));
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product ? 'Update Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
          <label>
            Notes:
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </label>
          <label>
            Images (comma-separated URLs):
            <input type="text" value={images} onChange={(e) => setImages(e.target.value)} />
          </label>
          <button type="submit">{product ? 'Update' : 'Add'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
