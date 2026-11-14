import type { Task } from '../types'
import { createEmptyState } from './emptyState'
import { createTaskItem } from './taskItem'

function sortByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((first, second) => first.dueDate.localeCompare(second.dueDate))
}

export function renderTaskList(container: HTMLElement, tasks: Task[]): void {
  container.replaceChildren()

  if (tasks.length === 0) {
    container.append(createEmptyState())
    return
  }

  const list = document.createElement('div')

  sortByDueDate(tasks).forEach((task) => {
    list.append(createTaskItem(task))
  })

  container.append(list)
}
