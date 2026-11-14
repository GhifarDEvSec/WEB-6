import type { Task } from '../types'
import { formatDueDate, isOverdue } from '../utils/date'

export function createTaskItem(task: Task): HTMLElement {
  const item = document.createElement('article')

  const title = document.createElement('h3')
  title.textContent = task.title

  const course = document.createElement('p')
  course.textContent = task.course

  const dueDate = document.createElement('p')
  dueDate.textContent = `Tenggat: ${formatDueDate(task.dueDate)}`

  const status = document.createElement('p')
  status.textContent = task.status === 'selesai' ? 'Selesai' : 'Belum selesai'

  item.append(title, course, dueDate)

  if (task.note) {
    const note = document.createElement('p')
    note.textContent = task.note
    item.append(note)
  }

  if (isOverdue(task)) {
    const overdue = document.createElement('p')
    overdue.textContent = 'Terlambat'
    item.append(overdue)
  }

  item.append(status)
  return item
}
