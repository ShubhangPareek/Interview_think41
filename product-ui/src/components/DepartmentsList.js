import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data.departments));
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(dep => (
          <li key={dep.id}>
            <Link to={`/departments/${dep.id}`}>
              {dep.name} ({dep.product_count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentsList;