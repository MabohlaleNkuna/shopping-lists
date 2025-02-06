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
    setFormProduct({ ...formProduct, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData?.id) return;

    const updatedProduct = {
      ...formProduct,
      quantity: parseInt(formProduct.quantity, 10),
      images: formProduct.images.split(','),
      userId: userData.id,
    };

    product ? dispatch(updateProduct({ id: product.id, updates: updatedProduct })) : dispatch(addProduct([updatedProduct]));
    setFormProduct({ name: '', quantity: '', notes: '', category: '', images: '' });
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? 'Update Product' : 'Add New Product'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={formProduct.name} onChange={(e) => handleChange('name', e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" value={formProduct.quantity} onChange={(e) => handleChange('quantity', e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea className="form-control" value={formProduct.notes} onChange={(e) => handleChange('notes', e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" value={formProduct.category} onChange={(e) => handleChange('category', e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Images (comma-separated)</label>
                <input type="text" className="form-control" value={formProduct.images} onChange={(e) => handleChange('images', e.target.value)} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">{product ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;