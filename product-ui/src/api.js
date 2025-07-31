const API_BASE = 'http://127.0.0.1:5000/api';

export const fetchDepartments = async () => {
  const res = await fetch(`${API_BASE}/departments`);
  return res.json();
};

export const fetchDepartmentProducts = async (id) => {
  const res = await fetch(`${API_BASE}/departments/${id}/products`);
  return res.json();
};