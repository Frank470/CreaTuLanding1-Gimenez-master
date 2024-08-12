import React from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";  
import './Checkout.css';
import db from '../firebase';  

const Checkout = ({ cart = [], clearCart }) => {

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const order = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      total: calculateTotal(),
      date: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order ID: ", docRef.id);
      alert(`Compra realizada con éxito. ID de la orden: ${docRef.id}`);
      handleClearCart();  // Vaciar el carrito aquí
    } catch (e) {
      console.error("Error al crear la orden: ", e);
      alert("Hubo un problema al procesar tu pedido. Inténtalo de nuevo.");
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>El carrito está vacío.</p>
          <Link to="/" className="back-to-products-button">Volver al catálogo</Link>
        </div>
      ) : (
        <div>
          <ul className="cart-items-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Finalizar Compra</button>
          <button className="clear-cart-button" onClick={handleClearCart}>Vaciar Carrito</button>
          <Link to="/" className="back-to-products-button">Volver al catálogo</Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
