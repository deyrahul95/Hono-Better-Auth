import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { todos } from "@/db/schema";
import { auth } from "@/lib/auth";

export type TodoDTO = InferSelectModel<typeof todos>;
export type AddTodoDTO = InferInsertModel<typeof todos>;

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
