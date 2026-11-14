import type { AppConfig } from './types'

export const appConfig: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  basePath: import.meta.env.VITE_BASE_PATH,
}
