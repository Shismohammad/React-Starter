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
  (request) => {
    // Get Access Token in stored in memory (variable) etc.
    const accessToken = useUserStore.getState().accessToken;

    // console.log('Access Token from store:', accessToken);

    if (!request._retry && accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    // console.warn('API Request config:', request.headers.Authorization);

    return request;
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        // Call the refresh token endpoint to get a new access token
        const response = await axios.post(
          `${API_CONFIG.API_URL}/auth/refresh-token`,
          {
            withCredentials: true,
          }
        );

        // console.log('New Access token:', response.data.data.accessToken);

        if (response?.data?.data?.accessToken) {
          // Set the new access token in the zustand store
          useUserStore.setState({
            accessToken: response.data.data.accessToken,
          });

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;

          // Update the authorization header with the new access token.
          // api.defaults.headers.common['Authorization'] =
          //   `Bearer ${response.data.data.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.warn('Token refresh failed:', refreshError);

        // remove token from LocalStorage or setToken(null) and navigate to login page

        useUserStore.setState({ user: null, accessToken: null, role: null });
        localStorage.removeItem('user');

        // const redirectTo = window.location.pathname + window.location.search;

        // history.pushState(
        //   { page: 'login' },
        //   'Login',
        //   `/login?redirectTo=${encodeURIComponent(redirectTo)}`
        // );

        // This will reload the page to ensure the navigation takes effect
        // window.location.href = `/login?redirectTo=${encodeURIComponent(
        //   redirectTo
        // )}`;

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
