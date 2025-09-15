import api from '../api/api';

/* Encode the query parameters for the API request to prevent issues with special characters
const encodedQuery = encodeURIComponent(query);

E.g:
const paramValue = "Jack & Jill";
const encodedValue = encodeURIComponent(paramValue);
encodedValue will be "Jack%20%26%20Jill"
const url = `http://example.com/api/search?name=${encodedValue}`; */

export const getCurrentUser = async () => {
  const response = await api.get(`users/current-user`);
  return response.data.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data.data;
};
