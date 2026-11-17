import type { Task, TaskFilter, TaskId, TaskInput, TaskStatus, TaskSummary } from '../types'
import { loadFromStorage, saveToStorage } from './storageService'
import { removeById, updateById } from '../utils/collection'

const TASKS_STORAGE_KEY = 'daftar-tugas-kuliah:tasks'

export function getTasks(): Task[] {
  return loadFromStorage<Task[]>(TASKS_STORAGE_KEY, [])
}

export function addTask(input: TaskInput): Task[] {
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    course: input.course,
    dueDate: input.dueDate,
    note: input.note,
    status: 'belum_selesai',
    createdAt: Date.now(),
  }

  const updatedTasks = [...getTasks(), task]
  saveToStorage<Task[]>(TASKS_STORAGE_KEY, updatedTasks)
  return updatedTasks
}

export function toggleTaskStatus(id: TaskId): Task[] {
  const tasks = getTasks()
  const targetTask = tasks.find((task) => task.id === id)

  if (!targetTask) {
    return tasks
  }

  const nextStatus: TaskStatus = targetTask.status === 'selesai' ? 'belum_selesai' : 'selesai'
  const updatedTasks = updateById<Task>(tasks, id, { status: nextStatus })
  saveToStorage<Task[]>(TASKS_STORAGE_KEY, updatedTasks)
  return updatedTasks
}

export function updateTask(id: TaskId, input: TaskInput): Task[] {
  const tasks = getTasks()
  const updatedTasks = updateById<Task>(tasks, id, {
    title: input.title,
    course: input.course,
    dueDate: input.dueDate,
    note: input.note,
  })
  saveToStorage<Task[]>(TASKS_STORAGE_KEY, updatedTasks)
  return updatedTasks
}

export function deleteTask(id: TaskId): Task[] {
  const tasks = getTasks()
  const updatedTasks = removeById<Task>(tasks, id)
  saveToStorage<Task[]>(TASKS_STORAGE_KEY, updatedTasks)
  return updatedTasks
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'semua') {
    return tasks
  }

  return tasks.filter((task) => task.status === filter)
}

export function summarizeTasks(tasks: Task[]): TaskSummary {
  return tasks.reduce<TaskSummary>(
    (summary, task) => {
      const belumSelesai = summary.belumSelesai + (task.status === 'belum_selesai' ? 1 : 0)
      const selesai = summary.selesai + (task.status === 'selesai' ? 1 : 0)

      return {
        total: summary.total + 1,
        belumSelesai,
        selesai,
      }
    },
    { total: 0, belumSelesai: 0, selesai: 0 },
  )
}
