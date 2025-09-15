# React-Starter

React JS Template

A starter template for React applications, featuring:

- User authentication
- API integration
- State management with Zustand
- Responsive design with Tailwind CSS
- Routing with React Router

JWT Authentication with Access and Refresh Tokens
This template implements JWT authentication using both access and refresh tokens. The access token is used for authenticating API requests, while the refresh token is used to obtain a new access token when the current one expires.

Access Token is stored in memory (React state) for security reasons, while the Refresh Token is stored in an HTTP-only cookie to prevent XSS attacks.

When the access token expires, the application automatically sends a request to the refresh token endpoint to obtain a new access token. This process is handled transparently, ensuring a seamless user experience.
