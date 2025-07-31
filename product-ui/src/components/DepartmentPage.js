import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DepartmentPage() {
  const { id } = useParams();
  const [department, setDepartment] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/departments/${id}`)
      .then(res => res.json())
      .then(data => setDepartment(data.name));

    fetch(`http://127.0.0.1:5000/api/departments/${id}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [id]);

  return (
    <div>
      <h2>Department: {department} (Total Products: {products.length})</h2>
      <Link to="/">⬅ Back to All Products</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name} - ₹{product.retail_price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentPage;