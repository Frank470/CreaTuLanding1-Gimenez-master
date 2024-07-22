import React from 'react';
import cartIcon from './cart-icon.png'; 
import './CartWidget.css';

const CartWidget = () => {
  const cartItems = 0; 
  return (
    <div className="cart-widget">
      <img src={cartIcon} alt="Carrito" className="cart-icon" />
      {cartItems > 0 && <span className="cart-notification">{cartItems}</span>}
    </div>
  );
};

export default CartWidget;
