import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jobtrail-server.onrender.com/api',
});

// Automatically attach token to every request if it exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;