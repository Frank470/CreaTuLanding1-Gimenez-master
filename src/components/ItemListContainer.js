import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemListContainer.css';

// Simulación de productos
const fetchProducts = (category) => {
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
      if (category) {
        resolve(allProducts.filter(product => product.category === category));
      } else {
        resolve(allProducts);
      }
    }, 1000);
  });
};

const ItemListContainer = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(product)} className="add-to-cart-button">Añadir al carrito</button>
                <Link to={`/item/${product.id}`} className="view-details-button">Ver detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
