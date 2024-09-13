import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCards.css';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = 'https://via.placeholder.com/150?text=No+Image'; // Placeholder for missing images
  const CACHE_KEY = 'cachedProducts';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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
    const fetchProducts = async () => {
      try {
        // Check if cached products exist and are still valid
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp, 10);

          if (age < CACHE_DURATION) {
            // If the cache is valid, use cached data
            setProducts(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        // Fetch products from server if cache is expired or does not exist
        const response = await axios.get('http://127.0.0.1:8000/api/products/all');

        // Add images for each product
        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            const imageUrl = await fetchFoodImage(product.name);
            return { ...product, imageUrl };
          })
        );

        // Store products in state and cache
        setProducts(productsWithImages);
        setLoading(false);

        // Cache products and timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify(productsWithImages));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
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
