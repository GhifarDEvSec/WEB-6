import type { Task, TaskInput } from '../types'
import { loadFromStorage, saveToStorage } from './storageService'

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
