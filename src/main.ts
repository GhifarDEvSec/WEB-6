import { appConfig } from './config'

const titleElement = document.querySelector<HTMLHeadingElement>('#app-title')
const footerElement = document.querySelector<HTMLElement>('#app-footer')

if (titleElement) {
  titleElement.textContent = appConfig.appName
}

if (footerElement) {
  footerElement.textContent = `${appConfig.appName} versi ${appConfig.appVersion}`
}
