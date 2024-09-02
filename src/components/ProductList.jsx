import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import { fetchAllProducts } from '../store/slices/productSlice';
import ProductForm from './ProductForm';
import Search from './Search';
import Sorting from './Sorting';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: users = [], fetchStatus = '' } = useSelector((state) => state.users || {});
  const { userData } = useSelector((state) => state.user) || {};
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [sortOption, setSortOption] = useState('');

  const query = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    if ((fetchStatus === '' || fetchStatus === 'error') && userData?.id) {
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

  const currentUser = users.find(user => user.id === userData?.id);
  const products = currentUser ? currentUser.products : [];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'quantity-asc':
        return a.quantity - b.quantity; 
      case 'quantity-desc':
        return b.quantity - a.quantity; 
      default:
        return 0;
    }
  });

  const categorizedProducts = sortedProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <Search />
      <Sorting onSort={setSortOption} />
      <button onClick={handleAddProduct}>Add New Product</button>
      {Object.keys(categorizedProducts).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          {categorizedProducts[category].map(product => (
            <Card key={product.id} id={product.id} name={product.name} price={product.price} imageUrl={product.images[0]} onEdit={() => handleEditProduct(product)} />
          ))}
        </div>
      ))}
      {isFormVisible && (
        <ProductForm product={productToEdit} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default ProductList;
