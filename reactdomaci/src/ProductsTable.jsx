import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsTable.css'; 

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id'); // Stanje za sortiranje po default-u po 'id'
  const [sortOrder, setSortOrder] = useState('asc'); // Stanje za rastuće ('asc') ili opadajuće ('desc') sortiranje

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Postavljamo inicijalno filtrirane proizvode
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Funkcija za filtriranje proizvoda po nazivu
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Funkcija za sortiranje proizvoda po odabranom polju
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'; // Ako se klikne isti field, menjamo redosled
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-table-container">
      <h1>Products</h1>

      {/* Polje za pretragu */}
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <table className="products-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortField === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('description')}>
              Description {sortField === 'description' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('price')}>
              Price (RSD) {sortField === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
