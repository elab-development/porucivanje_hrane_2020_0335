import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ProductsTable from './ProductsTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/auth" element={<AuthForm />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
