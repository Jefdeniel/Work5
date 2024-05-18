export const Config = {
  apiBaseUrl: import.meta.env.DEV
    ? 'http://localhost:8000/api'
    : window.location.origin + '/api',
};
