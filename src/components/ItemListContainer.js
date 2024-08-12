import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import db from '../firebase'; 
import './ItemListContainer.css';

const ItemListContainer = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const productCollection = collection(db, "products");
      let q = productCollection;

      if (categoryId) {
        q = query(productCollection, where("category", "==", categoryId));
      }

      const productSnapshot = await getDocs(q);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productList);
      setLoading(false);
    };

    getProducts();
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="item-list-container">
      {products.length ? (
        products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
          </div>
        ))
      ) : (
        <div className="no-products">No hay productos disponibles en esta categoría.</div>
      )}
    </div>
  );
};

export default ItemListContainer;
