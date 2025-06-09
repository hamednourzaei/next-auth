'use client'
import { useState } from 'react'

type Task = {
  id: string
  content: string
  status: string
}

export function useBoard() {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>({
    todo: [],
    inProgress: [],
    done: [],
  })

  const moveTask = (id: string, from: string, to: string) => {
    setColumns(prev => {
      const task = prev[from].find(t => t.id === id)
      if (!task) return prev
      return {
        ...prev,
        [from]: prev[from].filter(t => t.id !== id),
        [to]: [...prev[to], { ...task, status: to }],
      }
    })
  }

  const addTask = (task: Task) => {
    setColumns(prev => ({
      ...prev,
      [task.status]: [...prev[task.status], task],
    }))
  }

  const removeTask = (id: string, from: string) => {
    setColumns(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t.id !== id),
    }))
  }

  return { columns, setColumns, moveTask, addTask, removeTask }
}
