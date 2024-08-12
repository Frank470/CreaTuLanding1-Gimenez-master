import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import './ItemDetailContainer.css';
import db from '../firebase';

const ItemDetailContainer = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, "products", itemId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() });
      } else {
        console.log("No such product!");
      }
      setLoading(false);
    };

    getProduct();
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
