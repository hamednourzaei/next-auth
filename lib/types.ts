// lib/types.ts

export type TaskStatus = 'todo' | 'inProgress' | 'done'

export type Task = {
  id: string
  content: string
  status: TaskStatus
}
