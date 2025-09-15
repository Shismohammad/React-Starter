import api from '../api/api';

/* api call definitions for auth (types, schemas, requests): these are not part of features as this is a module shared across features
 */

export const login = async (data) => {
  const response = await api.post('/users/login', data);
  return response.data.data;
};

export const logout = async () => {
  const response = await api.post('/users/logout');
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/users/register', data);
  return response.data.data;
};

export const serverStatus = async () => {
  const response = await api.get('/health');
  return response.data.data;
};
