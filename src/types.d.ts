import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { todos } from "@/db/schema";

export type TodoDTO = InferSelectModel<typeof todos>;
export type AddTodoDTO = InferInsertModel<typeof todos>;
