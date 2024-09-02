import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntities } from '../actions/crud';
import ProductCard from '../components/ProductCard'; 
import { productSelectors } from '../helpers/selectors';
import ProductDetailModal from '../components/ProductDetailModal'; 

const Home = () => {
  const dispatch = useDispatch();
  const entity = 'products'; 


  const data = useSelector(productSelectors.selectEntityData);
  const loading = useSelector(productSelectors.selectEntityLoading);
  const error = useSelector(productSelectors.selectEntityError);

  const [selectedProduct, setSelectedProduct] = useState(null); 


  useEffect(() => {
    dispatch(fetchEntities(entity));
  }, [dispatch, entity]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>

      <div className="product-list">
        {data.map((item) => (
          <div key={item.id}>
            <ProductCard product={item} />
            <button onClick={() => handleViewDetails(item)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
