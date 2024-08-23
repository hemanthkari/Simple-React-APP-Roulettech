import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

export const signup = (userData) => {
  return api.post('signup/', userData);
};

export const login = (credentials) => {
  return api.post('login/', credentials);
};

export default api;