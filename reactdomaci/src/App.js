import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ProductsTable from './ProductsTable';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <HomePage></HomePage>
      <ProductsTable></ProductsTable>
    </div>
  );
}

export default App;
