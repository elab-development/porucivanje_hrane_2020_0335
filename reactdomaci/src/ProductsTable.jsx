import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsTable.css';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Novo stanje za dodavanje i uređivanje proizvoda
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = sessionStorage.getItem('auth_token'); // Uzimamo token iz sessionStorage

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch proizvoda sa servera
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products', {
        headers: { Authorization: `Bearer ${token}` }, // Dodavanje tokena u zaglavlje
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
      // Ažuriramo sessionStorage nakon što proizvodi budu preuzeti sa servera
      sessionStorage.setItem('products', JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to fetch products.');
      setLoading(false);
    }
  };

  // Kreiranje novog proizvoda
  const handleCreateProduct = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }, // Dodavanje tokena u zaglavlje
      });
      const updatedProducts = [...products, response.data];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setNewProduct({ name: '', description: '', price: '' }); // Resetovanje forme
      setIsModalOpen(false); // Zatvaranje modala
      // Ažuriramo sessionStorage nakon dodavanja novog proizvoda
      sessionStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (err) {
      setError('Failed to create product.');
    }
  };

  // Ažuriranje proizvoda
  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/products/${editingProduct.id}`, editingProduct, {
        headers: { Authorization: `Bearer ${token}` }, // Dodavanje tokena u zaglavlje
      });
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setEditingProduct(null); // Zatvaranje forme za ažuriranje
      // Ažuriramo sessionStorage nakon ažuriranja proizvoda
      sessionStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  // Brisanje proizvoda
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Dodavanje tokena u zaglavlje
      });
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      // Ažuriramo sessionStorage nakon brisanja proizvoda
      sessionStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  // Filtriranje proizvoda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Sortiranje proizvoda
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
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

      {/* Pretraga */}
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <button onClick={() => setIsModalOpen(true)} className="create-btn">Add New Product</button>

      {/* Tabela proizvoda */}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal za kreiranje proizvoda */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Create New Product</h2>
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button onClick={handleCreateProduct}>Create Product</button>
          </div>
        </div>
      )}

      {/* Forma za ažuriranje proizvoda */}
      {editingProduct && (
        <div className="form-container">
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Product name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
