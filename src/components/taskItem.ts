import type { Task, TaskId } from '../types'
import { formatDueDate, getDueDateParts, isOverdue } from '../utils/date'

export interface TaskItemHandlers {
  onToggle: (id: TaskId) => void
  onEdit: (id: TaskId) => void
  onDelete: (id: TaskId) => void
}

function createStatusBadge(task: Task, overdue: boolean): HTMLSpanElement {
  const badge = document.createElement('span')
  badge.classList.add('badge')

  if (overdue) {
    badge.classList.add('badge--late')
    badge.textContent = 'Terlambat'
    return badge
  }

  if (task.status === 'selesai') {
    badge.classList.add('badge--done')
    badge.textContent = 'Selesai'
    return badge
  }

  badge.classList.add('badge--pending')
  badge.textContent = 'Belum Selesai'
  return badge
}

function createStatusToggle(
  task: Task,
  onToggle: (id: TaskId) => void,
): HTMLLabelElement {
  const wrapper = document.createElement('label')
  wrapper.classList.add('task-toggle')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.status === 'selesai'
  checkbox.setAttribute(
    'aria-label',
    checkbox.checked
      ? `Tandai "${task.title}" sebagai belum selesai`
      : `Tandai "${task.title}" sebagai selesai`,
  )

  checkbox.addEventListener('change', () => {
    onToggle(task.id)
  })

  wrapper.append(checkbox)
  return wrapper
}

function createActionButtons(
  task: Task,
  handlers: TaskItemHandlers,
): HTMLDivElement {
  const actions = document.createElement('div')
  actions.classList.add('task-actions')

  const editButton = document.createElement('button')
  editButton.type = 'button'
  editButton.classList.add('task-action')
  editButton.textContent = 'Ubah'
  editButton.setAttribute('aria-label', `Ubah tugas "${task.title}"`)
  editButton.addEventListener('click', () => {
    handlers.onEdit(task.id)
  })

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.classList.add('task-action', 'task-action--danger')
  deleteButton.textContent = 'Hapus'
  deleteButton.setAttribute('aria-label', `Hapus tugas "${task.title}"`)
  deleteButton.addEventListener('click', () => {
    handlers.onDelete(task.id)
  })

  actions.append(editButton, deleteButton)
  return actions
}

export function createTaskItem(task: Task, handlers: TaskItemHandlers): HTMLElement {
  const overdue = isOverdue(task)
  const item = document.createElement('article')
  item.classList.add('task-card')

  if (overdue) {
    item.classList.add('task-card--overdue')
  }

  if (task.status === 'selesai') {
    item.classList.add('task-card--done')
  }

  const dueDateParts = getDueDateParts(task.dueDate)

  const dateBlock = document.createElement('div')
  dateBlock.classList.add('task-date')

  const day = document.createElement('span')
  day.classList.add('task-date__day')
  day.textContent = dueDateParts.day

  const month = document.createElement('span')
  month.classList.add('task-date__month')
  month.textContent = dueDateParts.month

  dateBlock.append(day, month)

  const content = document.createElement('div')
  content.classList.add('task-content')

  const title = document.createElement('h3')
  title.classList.add('task-title')
  title.textContent = task.title

  content.append(title)

  if (task.course) {
    const course = document.createElement('span')
    course.classList.add('task-course')
    course.textContent = task.course
    content.append(course)
  }

  const dueDate = document.createElement('p')
  dueDate.classList.add('task-due')
  dueDate.textContent = `Tenggat: ${formatDueDate(task.dueDate)}`
  content.append(dueDate)

  if (task.note) {
    const note = document.createElement('p')
    note.classList.add('task-note')
    note.textContent = task.note
    content.append(note)
  }

  const status = document.createElement('div')
  status.classList.add('task-status')
  status.append(createStatusToggle(task, handlers.onToggle), createStatusBadge(task, overdue))

  const meta = document.createElement('div')
  meta.classList.add('task-meta')
  meta.append(status, createActionButtons(task, handlers))

  item.append(dateBlock, content, meta)
  return item
}
