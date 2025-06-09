'use client'

import { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'

type TaskStatus = 'todo' | 'inProgress' | 'done'

type Task = {
  id: string
  content: string
  status: TaskStatus
}

interface TaskCardProps {
  task: Task
  columnId: string
}

export const TaskCard: FC<TaskCardProps> = ({ task, columnId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      column: columnId,
    },
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 bg-white rounded shadow mb-2 cursor-move"
    >
      {task.content}
    </div>
  )
}
