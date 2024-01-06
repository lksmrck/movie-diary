/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MOVIES_API_KEY: string;
  readonly VITE_MOVIES_BASE_URL: string;
  readonly VITE_MOVIES_IMG_API: string;

  readonly VITE_MOVIES_SEARCH_URL: string;
  readonly VITE_CATEGORIES_SEARCH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
