// src/App.js
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AddProduct from './components/AddProduct';
import Products from './pages/Products';
import Home from './pages/Home';

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            {/* Define route for the home page with "/home" path */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
            <Route path="/add-product" element={user ? <AddProduct /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
