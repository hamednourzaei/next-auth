'use client'

import React, { useState, useTransition } from 'react'
import { useBoard } from '@/lib/hooks/useBoard'
import { Column } from './Column'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { moveTaskAction, addTaskAction, removeTaskAction } from '@/app/board/actions'
import { useRouter } from 'next/navigation'
import { AddTaskForm } from './AddTaskForm'
import type {  TaskStatus } from '@/lib/types' // فقط import تایپ‌ها

export default function BoardDnD() {
  const { columns, moveTask, addTask, removeTask } = useBoard()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loadingStatus, setLoadingStatus] = useState<TaskStatus | null>(null)
  const sensors = useSensors(useSensor(PointerSensor))

  async function handleMoveTask(id: string, from: TaskStatus, to: TaskStatus) {
    if (from === to) return
    moveTask(id, from, to)
    setLoadingStatus(to)
    try {
      await moveTaskAction(id, from, to)
      startTransition(() => router.refresh())
    } catch (error) {
      console.error(error)
      moveTask(id, to, from)
    } finally {
      setLoadingStatus(null)
    }
  }

  async function handleRemoveTask(id: string, from: TaskStatus) {
    removeTask(id, from)
    setLoadingStatus(from)
    try {
      await removeTaskAction(id)
      startTransition(() => router.refresh())
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingStatus(null)
    }
  }

  async function handleAddTask(content: string, status: TaskStatus) {
    setLoadingStatus(status)
    try {
      await addTaskAction(content, status)
      addTask({
        id: crypto.randomUUID(),
        content,
        status,
      })
      startTransition(() => router.refresh())
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingStatus(null)
    }
  }

  const statuses: TaskStatus[] = ['todo', 'inProgress', 'done']

  const statusTitles: Record<TaskStatus, string> = {
    todo: 'Todo',
    inProgress: 'In Progress',
    done: 'Done',
  }

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-6 text-gray-900">
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        {statuses.map((status) => (
          <div key={status} className="w-1/3 flex flex-col bg-gray-50 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">{statusTitles[status]}</h2>

            <AddTaskForm
              onAdd={(content) => handleAddTask(content, status)}
              loading={loadingStatus === status || isPending}
            />

            <SortableContext items={columns[status]} strategy={verticalListSortingStrategy}>
              <Column
                key={status}
                id={status}
                title={statusTitles[status]}
                tasks={columns[status]}
                onMoveTask={handleMoveTask}
                onRemoveTask={handleRemoveTask}
                loading={loadingStatus === status}
              />
            </SortableContext>
          </div>
        ))}
      </DndContext>
    </div>
  )
}
