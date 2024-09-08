import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCards.css';  

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funkcija za preuzimanje proizvoda sa servera
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/all');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-cards-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="product-price">Price: {product.price} RSD</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
