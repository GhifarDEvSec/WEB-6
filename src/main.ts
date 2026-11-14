import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/dm-sans'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import { appConfig } from './config'
import type { Task, TaskFilter, TaskId } from './types'
import {
  addTask,
  filterTasks,
  getTasks,
  summarizeTasks,
  toggleTaskStatus,
} from './services/taskService'
import { renderTaskForm } from './components/taskForm'
import { renderTaskFilter } from './components/taskFilter'
import { renderSummaryPanel } from './components/summaryPanel'
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
const filterSection = document.querySelector<HTMLElement>('#filter-section')
const summarySection = document.querySelector<HTMLElement>('#summary-section')
const listSection = document.querySelector<HTMLElement>('#list-section')

let tasks: Task[] = getTasks()
let activeFilter: TaskFilter = 'semua'

function handleToggle(id: TaskId): void {
  tasks = toggleTaskStatus(id)
  renderAll()
}

function renderAll(): void {
  if (filterSection) {
    renderTaskFilter(filterSection, {
      activeFilter,
      onChange: (filter) => {
        activeFilter = filter
        renderAll()
      },
    })
  }

  if (summarySection) {
    renderSummaryPanel(summarySection, summarizeTasks(tasks))
  }

  if (listSection) {
    renderTaskList(
      listSection,
      filterTasks(tasks, activeFilter),
      activeFilter,
      tasks.length > 0,
      handleToggle,
    )
  }
}

if (formSection) {
  renderTaskForm(formSection, {
    onSubmit: (input) => {
      tasks = addTask(input)
      renderAll()
    },
  })
}

renderAll()
