const appName = import.meta.env.VITE_APP_NAME
const titleElement = document.querySelector<HTMLHeadingElement>('#app-title')

if (titleElement) {
  titleElement.textContent = appName
}
