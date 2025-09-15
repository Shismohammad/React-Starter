import axios from 'axios';
import { API_CONFIG } from '../../constants/constants';
import useUserStore from '../../store/zustand/userStore';

const api = axios.create({
  baseURL: `${API_CONFIG.API_URL}`,
  timeout: `${API_CONFIG.TIMEOUT}`,
  headers: `${API_CONFIG.HEADERS}`,
  withCredentials: true,
});

/*  This will ensure that the access token is included in the headers of every request made by the API client */
api.interceptors.request.use(
  (config) => {
    // Get Access Token in stored in memory (variable) etc.
    const accessToken = useUserStore.getState().accessToken;

    console.log('Access Token from store:', accessToken);

    if (!config._retry && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.warn('API Request config:', config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*  This will handle token refresh logic when a 403 response is received from the server */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;

    console.log('Error response:', error.response.status);

    if (error?.response?.status === 401 && !originalRequest?.sent) {
      try {
        originalRequest.sent = true;
        const response = await api.get('/users/refresh-token', {
          withCredentials: true,
        });

        console.log('new Refresh token response:', response.data.accessToken);

        // Set the new access token in the zustand store
        if (response.data.accessToken) {
          useUserStore.setState({ accessToken: response.data.accessToken });
        }

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        originalRequest._retry = true;

        return api(originalRequest);
      } catch (e) {
        // removeLocalStorageToken or setToken(null) and navigate to login
        useUserStore.setState({ user: null, accessToken: null, role: null });
        window.location.href = '/login';
        // navigate('/login', { state: { from: location }, replace: true });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
