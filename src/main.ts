import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/dm-sans'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import { appConfig } from './config'
import type { FormMode, Task, TaskFilter, TaskId } from './types'
import {
  addTask,
  deleteTask,
  filterTasks,
  getTasks,
  summarizeTasks,
  toggleTaskStatus,
  updateTask,
} from './services/taskService'
import { confirmDelete } from './components/confirmDialog'
import type { TaskFormController } from './components/taskForm'
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
let formMode: FormMode = { mode: 'tambah', taskId: null }
let formController: TaskFormController | null = null

function handleToggle(id: TaskId): void {
  tasks = toggleTaskStatus(id)
  renderAll()
}

function handleEdit(id: TaskId): void {
  const task = tasks.find((item) => item.id === id)

  if (!task || !formController) {
    return
  }

  formMode = { mode: 'ubah', taskId: id }
  formController.startEdit(task)
}

async function handleDelete(id: TaskId): Promise<void> {
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return
  }

  const confirmed = await confirmDelete(task.title)

  if (!confirmed) {
    return
  }

  tasks = deleteTask(id)

  if (formMode.mode === 'ubah' && formMode.taskId === id) {
    formMode = { mode: 'tambah', taskId: null }
    formController?.resetToAdd()
  }

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
      {
        onToggle: handleToggle,
        onEdit: handleEdit,
        onDelete: handleDelete,
      },
    )
  }
}

if (formSection) {
  formController = renderTaskForm(formSection, {
    onSubmit: (input, mode) => {
      if (mode.mode === 'ubah' && mode.taskId !== null) {
        tasks = updateTask(mode.taskId, input)
      } else {
        tasks = addTask(input)
      }

      formMode = { mode: 'tambah', taskId: null }
      renderAll()
    },
    onCancel: () => {
      formMode = { mode: 'tambah', taskId: null }
    },
  })
}

renderAll()
