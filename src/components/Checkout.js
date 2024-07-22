import React from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cart = [], clearCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="checkout-container">
      <h2>Resumen del Pedido</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="checkout-details">
          <ul className="checkout-list">
            {cart.map((product) => (
              <li key={product.id} className="checkout-item">
                <img src={product.imageUrl} alt={product.name} className="checkout-image" />
                <div className="checkout-info">
                  <h3 className="checkout-name">{product.name}</h3>
                  <p className="checkout-description">{product.description}</p>
                  <p className="checkout-price">${product.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={handleClearCart} className="clear-cart-button">Vaciar carrito</button>
            <button className="checkout-button">Proceder al pago</button>
          </div>
        </div>
      )}
      <Link to="/" className="home-link">Volver a inicio</Link>
    </div>
  );
};

export default Checkout;
