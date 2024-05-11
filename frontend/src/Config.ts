export const Config = {
  apiBaseUrl: import.meta.env.DEV
    ? 'http://localhost:8000'
    : window.location.origin + '/api',
};
