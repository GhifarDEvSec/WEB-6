import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/dm-sans'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import { appConfig } from './config'
import type { Task } from './types'
import { addTask, getTasks } from './services/taskService'
import { renderTaskForm } from './components/taskForm'
import { renderTaskList } from './components/taskList'

const titleElement = document.querySelector<HTMLHeadingElement>('#app-title')
const footerElement = document.querySelector<HTMLElement>('#app-footer')

if (titleElement) {
  titleElement.textContent = appConfig.appName
}

if (footerElement) {
  footerElement.textContent = `${appConfig.appName} versi ${appConfig.appVersion}`
}

const formSection = document.querySelector<HTMLElement>('#form-section')
const listSection = document.querySelector<HTMLElement>('#list-section')

let tasks: Task[] = getTasks()

function renderTasks(): void {
  if (listSection) {
    renderTaskList(listSection, tasks)
  }
}

if (formSection) {
  renderTaskForm(formSection, {
    onSubmit: (input) => {
      tasks = addTask(input)
      renderTasks()
    },
  })
}

renderTasks()
