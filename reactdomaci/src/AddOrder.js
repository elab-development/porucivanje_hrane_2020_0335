import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddOrder.css'; // Kreiraj CSS za stilizaciju

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryPersonId, setDeliveryPersonId] = useState('1');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/all');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Neuspešno preuzimanje proizvoda.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selected = products.find(product => product.id === parseInt(e.target.value));
    setSelectedProduct(selected);
    setTotalPrice(selected.price * quantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem('auth_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    // Konvertovanje formata iz datetime-local u Y-m-d H:i:s
    const formattedEstimatedTime = new Date(estimatedTime).toISOString().slice(0, 19).replace('T', ' ');
  
    const orderData = {
      store_id: 2, // ID prodavnice (primer)
      products: [{ product_id: selectedProduct.id, quantity }],
      delivery_person_id: deliveryPersonId,
      estimated_time: formattedEstimatedTime, // Koristi formatirano vreme
      total_price: totalPrice,
    };
  
    try {
      await axios.post('http://127.0.0.1:8000/api/orders', orderData, config);
      alert('Porudžbina kreirana uspešno!');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Greška prilikom kreiranja porudžbine.');
    }
  };
  

  if (loading) return <p>Učitavanje proizvoda...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="add-order-container">
      <h2>Kreiraj Porudžbinu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Izaberi proizvod:</label>
          <select value={selectedProduct?.id || ''} onChange={handleProductChange}>
            <option value="">Odaberi proizvod</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price} RSD
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Količina:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div> 

        <div className="form-group">
          <label>Procenjeno vreme isporuke:</label>
          <input
            type="datetime-local"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ukupna cena:</label>
          <input
            type="number"
            value={totalPrice}
            readOnly
          />
        </div>

        <button type="submit" className="submit-button">Kreiraj porudžbinu</button>
      </form>
    </div>
  );
};

export default AddOrder;
