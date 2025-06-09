"use server";

import { prisma } from "@/lib/db";



export async function addTaskAction(content: string, status: 'todo' | 'inProgress' | 'done') {
  await prisma.task.create({
    data: {
      content,
      status,
    },
  })
}


export async function moveTaskAction(id: string, from: string, to: string) {
  await prisma.task.update({
    where: { id },
    data: { status: to },
  });
}

export async function removeTaskAction(id: string) {
  await prisma.task.delete({
    where: { id },
  });
}
