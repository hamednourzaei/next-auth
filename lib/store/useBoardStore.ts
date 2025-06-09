'use client'

import { create } from 'zustand'

export type Task = {
  id: string
  content: string
  status: 'todo' | 'inProgress' | 'done'
}

type Columns = {
  todo: Task[]
  inProgress: Task[]
  done: Task[]
}

type BoardState = {
  columns: Columns
  setColumns: (columns: Columns) => void
  moveTask: (id: string, from: keyof Columns, to: keyof Columns) => void
  addTask: (task: Task) => void
  removeTask: (id: string, from: keyof Columns) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
  setColumns: (columns: Columns) => set({ columns }),
  moveTask: (id: string, from: keyof Columns, to: keyof Columns) =>
    set((state: BoardState) => {
      const task = state.columns[from].find((t) => t.id === id)
      if (!task) return state
      return {
        columns: {
          ...state.columns,
          [from]: state.columns[from].filter((t) => t.id !== id),
          [to]: [...state.columns[to], { ...task, status: to }],
        },
      }
    }),
  addTask: (task: Task) =>
    set((state: BoardState) => ({
      columns: {
        ...state.columns,
        [task.status]: [...state.columns[task.status], task],
      },
    })),
  removeTask: (id: string, from: keyof Columns) =>
    set((state: BoardState) => ({
      columns: {
        ...state.columns,
        [from]: state.columns[from].filter((t) => t.id !== id),
      },
    })),
}))
