export const API_CONFIG = {
  API_URL: 'http://localhost:8000/api/v1',
  TIMEOUT: 5000,
  HEADERS: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const DATE_FORMAT = 'DD-MM-YYYY';
export const TIME_FORMAT = 'hh:mm A';

export const COLOURS = {
  primary: '#6849a7',

  warning: '#cc475a',

  dark: {
    text: '#d4d4d4',

    title: '#fff',

    background: '#252231',

    navBackground: '#201e2b',

    iconColour: '#9591a5',

    iconColourFocused: '#fff',

    uiBackground: '#2f2b3d',
  },

  light: {
    text: '#625f72',

    title: '#201e2b',

    background: '#e0dfe8',

    navBackground: '#e8e7ef',

    iconColour: '#686477',

    iconColourFocused: '#201e2b',

    uiBackground: '#d6d5e1',
  },
};
