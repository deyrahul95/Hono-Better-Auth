import { Hono } from "hono";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { getTodosByUserIdAsync, insertTodoAsync } from "@/db/queries";
import { createTodoValidator } from "@/validators/create-todo.validator";
import type { HonoEnv } from "@/types";

export const todosRouter = new Hono<HonoEnv>();

todosRouter.use(authMiddleware);

todosRouter.get("/", async (c) => {
  const user = c.get("user");

  try {
    console.log(`Fetching user todos. UserId: ${user.id}`);
    const todoList = await getTodosByUserIdAsync(user.id);
    console.log(
      `Todos fetched successfully. UserId: ${user.id}, Count: ${todoList.length}`,
    );
    return c.json(todoList, 200);
  } catch (err) {
    console.error(`Error fetching todos. UserId: ${user.id}, Error: ${err}`);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

todosRouter.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const todoData = c.req.valid("json");

  try {
    console.log(
      `Creating todo. UserId: ${user.id}, Request: ${JSON.stringify(todoData)}`,
    );
    const newTodo = await insertTodoAsync({ ...todoData, userId: user.id });
    console.log(
      `Todo created successfully. UserId: ${user.id}, Todo: ${JSON.stringify(newTodo)}`,
    );
    return c.json(newTodo, 201);
  } catch (err) {
    console.error(
      `Error creating todo. UserId: ${user.id}, Request: ${JSON.stringify(todoData)}, Error: ${err}`,
    );
    return c.json({ error: "Failed to create todo" }, 500);
  }
});
