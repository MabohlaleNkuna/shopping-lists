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
  const { userData } = useSelector((state) => state.user) || {};
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const productsData = useSelector((state) => state.products.data) || [];

  const query = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchAllProducts(`http://localhost:5001/products?userId=${userData.id}`));
    }
  }, [dispatch, userData]);

  const handleAddProduct = () => {
    setCurrentProduct(null); // Reset current product for adding new
    setIsFormVisible(true);  // Show the form
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide the form
  };

  const filteredProducts = productsData.filter((product) =>
    product.name && product.name.toLowerCase().includes(query.toLowerCase())
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

  return (
    <div>
      <Search />
      <Sorting sortOption={sortOption} setSortOption={setSortOption} />
      <button onClick={handleAddProduct}>Add New Product</button>
      <div>
        {sortedProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.images[0]}
            onEdit={() => {
              setCurrentProduct(product);  // Set the selected product
              setIsFormVisible(true);      // Open the form for editing
            }}
          />
        ))}
      </div>
      {isFormVisible && (
        <ProductForm onClose={handleCloseForm} product={currentProduct} />
      )}
    </div>
  );
};

export default ProductList;
