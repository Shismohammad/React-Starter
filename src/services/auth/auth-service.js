import api from '../api/api';
import { saveUser } from '../user/user-service';

/* api call definitions for auth (types, schemas, requests): these are not part of features as this is a module shared across features
 */

export const login = async (data) => {
  const response = await api.post('/auth/login', data);

  if (response.data.data) {
    await saveUser(response.data.data);
    return response.data.data;
  }
  
  await saveUser(response.data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/register', data);

  if (response.data.data) {
    return response.data.data;
  }

  return response.data;
};

export const serverStatus = async () => {
  const response = await api.get('/health');

  if (response.data.data) {
    return response.data.data;
  }

  return response.data;
};
