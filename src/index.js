import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './assets/ProductCard.css'; 
import './assets/ProductDetailModal.css'; 
import './assets/AuthForms.css'; 
import './assets/ProductDetails.css'; 
import './assets/Navbar.css'; 

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
