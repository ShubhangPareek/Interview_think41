import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <Link to={`/product/${prod.id}`}>
              {prod.name} - ₹{prod.retail_price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;