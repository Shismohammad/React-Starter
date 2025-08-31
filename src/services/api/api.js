export const API_CONFIG = {
  API_URL: 'https://api.example.com',
  HEADERS: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${'JWT_TOKEN'}`,
  },
};

// Encode the query parameters for the API request to prevent issues with special characters
// const encodedQuery = encodeURIComponent(query);

import axios from 'axios';

const api = axios.create({
  baseURL: `${API_CONFIG.API_URL}`,
});

api.interceptors.request.use(
  (config) => {
    const token = 'Your JWT Token here';

    config.headers.Authorization =
      !config._retry && token
        ? `Bearer ${token}`
        : config.headers.Authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403) {
      try {
        const response = await api.get('api/refreshToken');

        // setToken(response.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        originalRequest._retry = true;
        
        return api(originalRequest);
      } catch (e) {
        // setToken(null);
        // removeLocalStorageToken
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// const axiosHttp = axios.create({
//   baseURL: `${API_CONFIG.API_URL}`,
// });

// axiosHttp.interceptors.request.use(
//   (config) => {
//     const token = 'Your JWT Token here';
//     return {
//       ...config,
//       headers: {
//         ...(token !== null && { Authorization: `${token}` }),
//         ...config.headers,
//       },
//     };
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosHttp.interceptors.response.use(
//   (response) => {
//     //const url = response.config.url;

//     //setLocalStorageToken(token);
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       //(`unauthorized :)`);
//       //localStorage.removeItem("persist:root");
//       //removeLocalStorageToken
//       //window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosHttp;
