// deno-lint-ignore-file require-await
import { format } from "https://deno.land/std@0.146.0/datetime/mod.ts";
import { DBCommands, NewTodo, initCommands } from "./db.ts";
import { Ok, Result } from "./result.ts";

type ReqTodo = {
  title: string;
  body: string;
};

type HandlerError = {
  status: number;
  statusText: string;
  reason: string;
};

async function handleIndex(
  _request: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const todos = db.getTodos();
  return Ok(responseJson(todos));
}

async function handleCreate(
  request: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const newTodo: NewTodo = await request.json();
  const todo = db.createTodo(newTodo);
  return Ok(responseJson(todo));
}

async function handleUpdate(
  request: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const reqTodo: ReqTodo = await request.json();
  const id = extractId(request.url);

  const todo = db.updateTodo({
    id: id,
    ...reqTodo,
  });
  return Ok(responseJson(todo));
}

async function handleDelete(
  request: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const id = extractId(request.url);
  const todo = db.deleteTodo(id);
  return Ok(responseJson(todo));
}

function extractId(url: string) {
  const { pathname } = new URL(url);
  const id = parseInt(pathname.split("/").at(-1) ?? "");
  return id;
}

async function handleRequest(
  request: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  const { pathname } = new URL(request.url);
  const pathPattern = new URLPattern({ pathname: "/todos*" });
  const method = request.method;

  if (pathPattern.test({ pathname })) {
    switch (method) {
      case "GET":
        return handleIndex(request, db);
      case "POST":
        return handleCreate(request, db);
      case "PUT":
        return handleUpdate(request, db);
      case "DELETE":
        return handleDelete(request, db);
    }
  }

  return Ok(new Response("Not Found.", { status: 404 }));
}

function log(request: Request, result: Result<Response, HandlerError>) {
  const { pathname } = new URL(request.url);
  const method = request.method;

  console.log(
    `${format(new Date(), "yyyy-MM-dd HH:mm:ss")} ${method} ${pathname} ${
      result.payload.status
    }`
  );
}

const responseError = (e: HandlerError): Response => {
  const message = e.reason || "Unknown Error";
  const headers = {
    "Content-Type": "text/plain;charset=UTF-8",
    "Content-Length": message.length.toString(),
  };

  return new Response(message, {
    status: e.status || 500,
    statusText: e.statusText || undefined,
    headers,
  });
};

const responseJson = (json: unknown): Response => {
  const headers = {
    "Content-Type": "application/json",
  };

  const body = JSON.stringify(json, null, 2);
  return new Response(body, { headers });
};

function render(result: Result<Response, HandlerError>) {
  switch (result.type) {
    case "Ok":
      return result.payload;
    case "Err":
      return responseError(result.payload);
  }
}

export async function handler(request: Request): Promise<Response> {
  const dbCommands = initCommands("development.db");
  const result = await handleRequest(request, dbCommands);
  log(request, result);
  return render(result);
}
