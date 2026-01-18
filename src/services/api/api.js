import axios from 'axios';
import { API_CONFIG } from '../../constants/constants';
import useUserStore from '../../store/zustand/userStore';

const api = axios.create({
  baseURL: API_CONFIG.API_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

/*  This will ensure that the access token is included in the headers of every request made by the API client */
api.interceptors.request.use(
  (config) => {
    // Get Access Token in stored in memory (variable) etc.
    const accessToken = useUserStore.getState().accessToken;

    // console.log('Access Token from store:', accessToken);

    if (!config._retry && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // console.warn('API Request config:', config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*  This will handle token refresh logic when a 401 response is received from the server */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?.sent) {
      try {
        originalRequest.sent = true;

        // Call the refresh token endpoint to get a new access token
        const response = await api.post('/auth/refresh-token', {
          withCredentials: true,
        });

        // console.log('New Access token:', response.data.data.accessToken);

        if (response?.data?.data?.accessToken) {
          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;

          // Set the new access token in the zustand store
          useUserStore.setState({
            accessToken: response.data.data.accessToken,
          });
        }

        originalRequest._retry = true;

        return api(originalRequest);
      } catch (e) {
        // remove token from LocalStorage or setToken(null) and navigate to login
        useUserStore.setState({ user: null, accessToken: null, role: null });
        localStorage.removeItem('user');
        // window.location.href = '/login';
        // navigate('/login', { state: { from: location }, replace: true });

        const searchParams = new URLSearchParams();

        const redirectTo =
          searchParams.get('redirectTo') ||
          window.location.pathname + window.location.search;

        // const currentUrl = window.location.pathname + window.location.search;

        window.location.href = `/login?redirectTo=${encodeURIComponent(
          redirectTo
        )}`;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
