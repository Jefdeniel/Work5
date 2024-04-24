export const Config = {
  apiBaseUrl: import.meta.env.DEV
    ? 'http://localhost:3045'
    : window.location.origin + '/api',
};
