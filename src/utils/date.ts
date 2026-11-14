import dayjs from 'dayjs'
import 'dayjs/locale/id'
import type { DueDateParts, Task } from '../types'

dayjs.locale('id')

export function formatDueDate(dueDate: string): string {
  return dayjs(dueDate).format('D MMMM YYYY')
}

export function getDueDateParts(dueDate: string): DueDateParts {
  const parsedDate = dayjs(dueDate)

  return {
    day: parsedDate.format('D'),
    month: parsedDate.format('MMM').toUpperCase(),
  }
}

export function isOverdue(task: Task): boolean {
  if (task.status !== 'belum_selesai') {
    return false
  }

  return dayjs(task.dueDate).isBefore(dayjs(), 'day')
}
