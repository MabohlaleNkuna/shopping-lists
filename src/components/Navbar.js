// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/auth';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from react-icons


const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const shoppingList = useSelector((state) => state.shoppingList); // Access shopping list from Redux state
  const [showCart, setShowCart] = useState(false); // State to manage cart visibility

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        {!user ? (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => dispatch(logout())}>Logout</button></li>
          </>
        )}
      </ul>



      {/* Shopping List Modal */}
      {showCart && (
        <div className="cart-modal">
          <h3>Shopping List</h3>
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <button className="close-modal" onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
