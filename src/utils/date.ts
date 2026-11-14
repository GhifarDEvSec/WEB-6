import dayjs from 'dayjs'
import 'dayjs/locale/id'
import type { Task } from '../types'

dayjs.locale('id')

export function formatDueDate(dueDate: string): string {
  return dayjs(dueDate).format('D MMMM YYYY')
}

export function isOverdue(task: Task): boolean {
  if (task.status !== 'belum_selesai') {
    return false
  }

  return dayjs(task.dueDate).isBefore(dayjs(), 'day')
}
