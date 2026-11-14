import type { Task } from '../types'
import { formatDueDate, getDueDateParts, isOverdue } from '../utils/date'

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

export function createTaskItem(task: Task): HTMLElement {
  const overdue = isOverdue(task)
  const item = document.createElement('article')
  item.classList.add('task-card')

  if (overdue) {
    item.classList.add('task-card--overdue')
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

  const meta = document.createElement('div')
  meta.classList.add('task-meta')
  meta.append(createStatusBadge(task, overdue))

  item.append(dateBlock, content, meta)
  return item
}
