export type TaskId = string

export type TaskStatus = 'belum_selesai' | 'selesai'

export type TaskFilter = TaskStatus | 'semua'

export interface Task {
  id: TaskId
  title: string
  course: string
  dueDate: string
  note: string
  status: TaskStatus
  createdAt: number
}

export type TaskInput = Omit<Task, 'id' | 'status' | 'createdAt'>

export interface AppConfig {
  appName: string
  appVersion: string
  basePath: string
}

export interface DueDateParts {
  day: string
  month: string
}

export interface TaskSummary {
  total: number
  belumSelesai: number
  selesai: number
}

export interface FormMode {
  mode: 'tambah' | 'ubah'
  taskId: TaskId | null
}
