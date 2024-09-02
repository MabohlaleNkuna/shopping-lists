
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntities, createEntity } from '../actions/crud';
import ProductCard from '../components/ProductCard'; 
import ProductDetails from '../components/ProductDetails'; 
import AddProduct from '../components/AddProduct'; 
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useSelector((state) => state.crud.products || { data: [], loading: false, error: null });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'

  useEffect(() => {
    if (user) {
      dispatch(fetchEntities('products', user.id)); // Fetch products specific to the logged-in user
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [dispatch, user, navigate]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleAddToShoppingList = (product) => {
    setShoppingList((prevList) => [...prevList, product]);
    alert(`${product.name} has been added to your shopping list.`);
  };

  const handleAddProduct = (product) => {
    dispatch(createEntity('products', product));
    setShowModal(false);
  };

  // Search, filter, and sort products
  const filteredProducts = data
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => filterCategory ? product.category === filterCategory : true)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>My Products</h2>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Add more categories as needed */}
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Name (Asc)</option>
          <option value="desc">Sort by Name (Desc)</option>
        </select>
      </div>

      {/* Add Product Button */}
      <button className="add-product-btn" onClick={() => setShowModal(true)}>
        Add Product
      </button>

      <div className="product-list">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onClick={() => handleProductClick(item)} // Handle click to show details
          />
        ))}
      </div>

      {/* Render ProductDetails if a product is selected */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
          onAddToShoppingList={handleAddToShoppingList}
        />
      )}

      {/* Render AddProductModal */}
      <AddProduct
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Render Shopping List (optional) */}
      <div className="shopping-list">
        <h3>Shopping List</h3>
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
