export const GlobalEnvConfig = Object.freeze({
  PORT: import.meta.env.VITE_PORT ?? 5173,
  APP_VERSION: import.meta.env.VITE_APP_VERSION as string,
  BASE_API_PREFIX: '/base-api',
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL as string,
  MOCK_API_URL: import.meta.env.VITE_MOCK_API_URL as string,
  MOCK_API_PREFIX: '/mock-api',
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
})
