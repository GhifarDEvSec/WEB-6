import type { Task, TaskFilter } from '../types'
import { createEmptyState } from './emptyState'
import type { TaskItemHandlers } from './taskItem'
import { createTaskItem } from './taskItem'

interface EmptyMessage {
  title: string
  description: string
}

const EMPTY_MESSAGES: Record<TaskFilter, EmptyMessage> = {
  semua: {
    title: 'Belum ada tugas',
    description: 'Tambahkan tugas baru lewat form di atas.',
  },
  belum_selesai: {
    title: 'Tidak ada tugas yang belum selesai',
    description: 'Semua tugas sudah selesai.',
  },
  selesai: {
    title: 'Tidak ada tugas yang selesai',
    description: 'Selesaikan tugas lewat kotak centang.',
  },
}

function sortByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((first, second) => first.dueDate.localeCompare(second.dueDate))
}

export function renderTaskList(
  container: HTMLElement,
  tasks: Task[],
  activeFilter: TaskFilter,
  hasAnyTask: boolean,
  handlers: TaskItemHandlers,
): void {
  container.replaceChildren()

  if (tasks.length === 0) {
    const message = hasAnyTask ? EMPTY_MESSAGES[activeFilter] : EMPTY_MESSAGES.semua
    container.append(createEmptyState(message.title, message.description))
    return
  }

  const list = document.createElement('div')
  list.classList.add('task-list')

  sortByDueDate(tasks).forEach((task) => {
    list.append(createTaskItem(task, handlers))
  })

  container.append(list)
}
