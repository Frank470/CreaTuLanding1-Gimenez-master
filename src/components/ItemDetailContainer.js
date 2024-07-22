import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemDetailContainer.css';

// Simulación de productos
const fetchProduct = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allProducts = [
        { id: 1, name: 'Laptop', description: 'Laptop moderna', price: 999, imageUrl: 'https://via.placeholder.com/150', category: 'electronics' },
        { id: 2, name: 'T-Shirt', description: 'Camiseta cómoda', price: 19, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
        { id: 3, name: 'Sofa', description: 'Sofa elegante', price: 499, imageUrl: 'https://via.placeholder.com/150', category: 'home' },
        { id: 4, name: 'Smartphone', description: 'Teléfono inteligente', price: 699, imageUrl: 'https://via.placeholder.com/150', category: 'electronics' },
        { id: 5, name: 'Table', description: 'Mesa de comedor', price: 149, imageUrl: 'https://via.placeholder.com/150', category: 'home' },
        { id: 6, name: 'Jacket', description: 'Chaqueta de invierno', price: 89, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' }
      ];
      resolve(allProducts.find(product => product.id === parseInt(id)));
    }, 1000);
  });
};

const ItemDetailContainer = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchProduct(itemId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [itemId]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="item-detail-container">
      {product ? (
        <div className="product-detail">
          <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
          <div className="product-detail-info">
            <h2 className="product-detail-name">{product.name}</h2>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-button">Añadir al carrito</button>
            <Link to="/" className="back-to-products-button">Volver al catálogo</Link>
          </div>
        </div>
      ) : (
        <div className="loading">Producto no encontrado</div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
