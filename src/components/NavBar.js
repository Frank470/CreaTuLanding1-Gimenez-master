import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import cartIcon from './cart-icon.png'; 
const NavBar = ({ cartItems }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-content">
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/category/electronics">Electrónica</Link></li>
          <li><Link to="/category/clothing">Ropa</Link></li>
          <li><Link to="/category/home">Hogar</Link></li>
        </ul>
        <div className="cart-icon">
          <Link to="/checkout">
            <img src={cartIcon} alt="Cart" />
            {cartItems !== undefined && cartItems > 0 ? (
              <span className="cart-count">{cartItems}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
