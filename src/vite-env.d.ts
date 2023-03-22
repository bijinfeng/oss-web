/// <reference types="vite/client" />

declare module "intersection-observer";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare interface Window {
  __LOGIN__: boolean;
  __USER_INFO__: Promise<any>;
}
