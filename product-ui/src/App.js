import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import DepartmentsList from './components/DepartmentsList';
import DepartmentPage from './components/DepartmentPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Products</h1>
        <DepartmentsList /> {/* Sidebar/menu-like section */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/departments/:id" element={<DepartmentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;