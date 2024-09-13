import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCards.css';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = 'https://via.placeholder.com/150?text=No+Image'; // Placeholder for missing images

  // Funkcija za preuzimanje slike hrane sa Foodish API-ja na osnovu naziva proizvoda
  const fetchFoodImage = async (productName) => {
    const UNSPLASH_ACCESS_KEY = 'YvBxTVU_ggpMkTDjaZOyGnMh79OzyJlZUiC1D1gu9oE';  
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: productName,
          client_id: UNSPLASH_ACCESS_KEY,
          per_page: 1, // Return only 1 image
        },
      });
      const imageUrl = response.data.results[0]?.urls.small;
      return imageUrl || placeholderImage; // If no image found, use placeholder
    } catch (err) {
      console.error(`Failed to fetch image for ${productName}:`, err);
      return placeholderImage; // Return placeholder on error
    }
  };
  

  useEffect(() => {
    // Funkcija za preuzimanje proizvoda sa servera
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/all');

        // Dodavanje slike za svaki proizvod
        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            const imageUrl = await fetchFoodImage(product.name);
            return { ...product, imageUrl };
          })
        );

        setProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        setError('Neuspešno preuzimanje proizvoda.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Učitavanje proizvoda...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-cards-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} onError={(e) => e.target.src = placeholderImage} />
          <p>{product.description}</p>
          <p className="product-price">Cena: {product.price} RSD</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
