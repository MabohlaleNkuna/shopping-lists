// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import { fetchAllProducts } from '../store/slices/productSlice';
import ProductForm from './ProductForm';
import Search from './Search';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: products, fetchStatus } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.user);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const query = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    if (fetchStatus === '' || fetchStatus === 'error') {
      dispatch(fetchAllProducts(`http://localhost:5000/products?userId=${userData.id}&search=${query}`));
    }
  }, [fetchStatus, dispatch, userData, query]);

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const categorizedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container product-catalogue">
      <Search />
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
