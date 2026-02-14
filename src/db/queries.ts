import { eq, desc } from "drizzle-orm";
import { db } from "@/db/db";
import { todos } from "@/db/schema";
import type { AddTodoDTO, TodoDTO } from "@/types";

export const insertTodoAsync = async (todo: AddTodoDTO): Promise<TodoDTO> => {
  const [newTodo] = await db.insert(todos).values(todo).returning();
  return newTodo;
};

export const getTodosByUserIdAsync = async (
  userId: string,
): Promise<TodoDTO[]> => {
  const todoList = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.createdAt));

  return todoList;
};
