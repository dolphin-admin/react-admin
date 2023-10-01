/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_APP_VERSION: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_MOCK_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
