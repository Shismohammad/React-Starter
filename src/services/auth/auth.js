import api from '../api/api';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async () => {
  const response = await api.get('/auth/me');

  return response.data;
};

const logout = () => {
  return api.post('/auth/logout');
};

const registerWithEmailAndPassword = (data) => {
  return api.post('/auth/register', data);
};

const loginWithEmailAndPassword = (data) => {
  return api.post('/auth/login', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
