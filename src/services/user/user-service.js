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

export const saveUser = async (data) => {
  // console.log('here');
  const encoder = new TextEncoder();

  const dataArray = encoder.encode(JSON.stringify(data));

  var iv = crypto.getRandomValues(new Uint8Array(16));

  const encriptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 128,
      },
      true,
      ['encrypt', 'decrypt']
    ),
    dataArray
  );

  localStorage.removeItem('user');

  localStorage.setItem('user', encriptedData);
};

export const getUserDecrypted = async () => {
  const sessionData = localStorage.getItem('user');

  const encoder = new TextEncoder();

  if (sessionData) {
    // const bytes =
    const encryptedData = new Uint8Array(sessionData);

    const key = await crypto.subtle.importKey(
      'raw',
      new Uint8Array(16), // Replace with the actual key used for encryption
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: encryptedData.slice(0, 12), // Extract the IV from the encrypted data
      },

      key,
      encryptedData.slice(12) // The rest is the actual encrypted data
    );

    return JSON.parse(new TextDecoder().decode(decryptedData));
  }

  return null;
};
