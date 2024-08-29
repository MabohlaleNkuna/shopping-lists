import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../store/slices/productSlice';

const ProductForm = ({ product, onClose }) => {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(product ? product.name : '');
  const [quantity, setQuantity] = useState(product ? product.quantity : '');
  const [notes, setNotes] = useState(product ? product.notes : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const [images, setImages] = useState(product ? product.images.join(',') : '');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, quantity, notes, category, images: images.split(','), userId: userData.id };
    if (product) {
      dispatch(updateProduct({ id: product.id, updates: productData }));
    } else {
      dispatch(addProduct(productData));
    }
    onClose();
  };

  return (
    <div className="modal" style={{
      display: 'block',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        margin: '15% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
      }}>
        <span className="close" 
              style={{
                color: '#aaa',
                float: 'right',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={onClose}
        >
          &times;
        </span>
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
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </label>
          <label>
            Images (comma separated URLs):
            <input type="text" value={images} onChange={(e) => setImages(e.target.value)} required />
          </label>
          <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
