// deno-lint-ignore-file require-await
import { DBCommands } from "./db.ts";
import { HandlerError, CustomHandler } from "./main.ts";
import { Ok, Result } from "./result.ts";

type ReqTodo = {
  title: string;
  body: string;
};

async function indexHandler(
  _req: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const todos = db.getTodos();
  return Ok(responseJson(todos));
}

async function createHandler(
  req: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const newTodo: ReqTodo = await req.json();
  const todo = db.createTodo(newTodo);
  return Ok(responseJson(todo));
}

async function updateHandler(
  req: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const reqTodo: ReqTodo = await req.json();
  const id = extractId(req.url);

  const todo = db.updateTodo({
    id: id,
    ...reqTodo,
  });
  return Ok(responseJson(todo));
}

async function deleteHandler(
  req: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const id = extractId(req.url);
  const todo = db.deleteTodo(id);
  return Ok(responseJson(todo));
}

function extractId(url: string) {
  const { pathname } = new URL(url);
  const id = parseInt(pathname.split("/").at(-1) ?? "");
  return id;
}

const responseJson = (json: unknown): Response => {
  const headers = {
    "Content-Type": "application/json",
  };

  const body = JSON.stringify(json, null, 2);
  return new Response(body, { headers });
};

async function notFoundHandler(
  _req: Request,
  _db: DBCommands
): Promise<Result<Response, HandlerError>> {
  return Ok(new Response("Not Found.", { status: 404 }));
}

export function routes(req: Request): CustomHandler {
  const { pathname } = new URL(req.url);
  const pathPattern = new URLPattern({ pathname: "/todos*" });
  const method = req.method;

  if (pathPattern.test({ pathname })) {
    switch (method) {
      case "GET":
        return indexHandler;
      case "POST":
        return createHandler;
      case "PUT":
        return updateHandler;
      case "DELETE":
        return deleteHandler;
    }
  }

  return notFoundHandler;
}
