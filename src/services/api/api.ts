export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  HEADERS: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${'JWT_TOKEN'}`,
  },
};

// Encode the query parameters for the API request to prevent issues with special characters
// const encodedQuery = encodeURIComponent(query);
