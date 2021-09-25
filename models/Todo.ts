import Firebase from "../config/firebase";
import "firebase/firestore";

const db = Firebase.firestore();

export type TodoCategory =
  | "career"
  | "education"
  | "family"
  | "happiness"
  | "health"
  | "relationships"
  | "errands";

export interface TodoItem {
  id: string;
  name: string;
  urgent: boolean;
  important: boolean;
  progress: number;
  description?: string;
  weight: number;
  category: TodoCategory;
  dueDate: string;
}

export async function newTodo(
  userId: string,
  name: string,
  urgent: boolean,
  important: boolean,
  progress: number,
  description: string,
  weight: number,
  category: TodoCategory,
  dueDate: string
): Promise<TodoItem> {
  const doc = await db.collection(`user/${userId}/todo`).add({
    category,
    description,
    dueDate,
    important,
    name,
    progress,
    urgent,
    weight,
  });

  return {
    id: doc.id,
    category,
    description,
    dueDate,
    important,
    name,
    progress,
    urgent,
    weight,
  };
}

//

function deserializeTodo(id: string, data: any): TodoItem {
  return {
    id,
    name: data["name"] as string,
    urgent: data["urgent"] as boolean,
    important: data["important"] as boolean,
    progress: data["progress"] as number,
    description: data["description"] as string,
    weight: data["weight"] as number,
    category: data["category"] as TodoCategory,
    dueDate: data["dueDate"] as string,
  };
}

export async function getTodoList(userId: string): Promise<TodoItem[]> {
  const docs = await db.collection(`/user/${userId}/todo`).get();
  return docs.docs.map((doc) => deserializeTodo(doc.id, doc.data()));
}

export async function getTodo(userId: string, id: string): Promise<TodoItem> {
  const doc = await db.doc(`/user/${userId}/todo/${id}`).get();
  return deserializeTodo(doc.id, doc.data());
}

export async function syncTodo(
  userId: string,
  {
    id,
    name,
    dueDate,
    weight,
    description,
    progress,
    important,
    category,
    urgent,
  }: TodoItem
): Promise<void> {
  await db.doc(`/user/${userId}/todo/${id}`).update({
    name,
    urgent,
    important,
    progress,
    description,
    weight,
    category,
    dueDate,
  });
}

export async function deleteTodo(
  userId: string,
  todo: TodoItem
): Promise<void> {
  await db.doc(`/user/${userId}/todo/${todo.id}`).delete();
}

export function todoIsOverdue(todo: TodoItem) {
  return new Date(todo.dueDate) < new Date();
}

export const todoCountOverdue = (todos: TodoItem[]) =>
  todos.reduce((acc, val) => acc + (todoIsOverdue(val) ? 1 : 0), 0);
