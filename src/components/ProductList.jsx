import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { fetchAllProducts } from '../store/slices/productSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, fetchStatus } = useSelector((state) => state.products);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    if (fetchStatus === '' || fetchStatus === 'error') {
      dispatch(fetchAllProducts('http://localhost:5000/products'));
    }
  }, [fetchStatus, dispatch]);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  if (fetchStatus === 'pending') {
    return <div>Loading...</div>;
  }

  if (fetchStatus === 'error') {
    return <div>Error loading products.</div>;
  }

  const categorizedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container product-catalogue">
      <button onClick={handleAddProduct}>Add New Product</button>
      {Object.keys(categorizedProducts).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="row">
            {categorizedProducts[category].map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.images[0]}
                onEdit={() => handleEditProduct(product)}
              />
            ))}
          </div>
        </div>
      ))}
      {isFormVisible && <ProductForm product={productToEdit} onClose={handleCloseForm} />}
    </div>
  );
};

export default ProductList;
