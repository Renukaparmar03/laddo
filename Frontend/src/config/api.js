import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:5000';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');

const LOCALHOST_API_ORIGIN_PATTERN = /^https?:\/\/localhost:5000(?=\/|$)/i;

const rewriteForAxios = (url) => {
  if (typeof url !== 'string') {
    return url;
  }

  if (LOCALHOST_API_ORIGIN_PATTERN.test(url)) {
    return url.replace(LOCALHOST_API_ORIGIN_PATTERN, '');
  }

  return url;
};

const rewriteForFetch = (url) => {
  if (typeof url !== 'string') {
    return url;
  }

  if (LOCALHOST_API_ORIGIN_PATTERN.test(url)) {
    return `${API_BASE_URL}${url.replace(LOCALHOST_API_ORIGIN_PATTERN, '')}`;
  }

  if (url.startsWith('/api/')) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
};

export const configureApiClients = () => {
  if (globalThis.__laddoApiClientsConfigured) {
    return;
  }

  globalThis.__laddoApiClientsConfigured = true;

  axios.defaults.baseURL = API_BASE_URL;
  axios.interceptors.request.use((config) => ({
    ...config,
    url: rewriteForAxios(config.url),
  }));

  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    const originalFetch = window.fetch.bind(window);

    window.fetch = (input, init) => {
      if (input instanceof Request) {
        const rewrittenUrl = rewriteForFetch(input.url);
        if (rewrittenUrl !== input.url) {
          return originalFetch(new Request(rewrittenUrl, input));
        }

        return originalFetch(input, init);
      }

      const rewrittenInput = rewriteForFetch(String(input));
      return originalFetch(rewrittenInput, init);
    };
  }
};
