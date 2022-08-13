import { format } from "https://deno.land/std@0.146.0/datetime/mod.ts";
import { DBCommands, initCommands, initDb } from "./db.ts";
import { Result } from "./result.ts";
import { routes } from "./routes.ts";

export type HandlerError = {
  status: number;
  statusText: string;
  reason: string;
};

export type CustomHandler = (
  req: Request,
  db: DBCommands
) => Promise<Result<Response, HandlerError>>;

function run(
  handler: CustomHandler,
  req: Request,
  db: DBCommands
): Promise<Result<Response, HandlerError>> {
  return handler(req, db);
}

function log(req: Request, result: Result<Response, HandlerError>) {
  const { pathname } = new URL(req.url);
  const method = req.method;

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

function render(result: Result<Response, HandlerError>) {
  switch (result.type) {
    case "Ok":
      return result.payload;
    case "Err":
      return responseError(result.payload);
  }
}

export async function mainHandler(req: Request): Promise<Response> {
  const dbCommands = initCommands(initDb("development.db"));
  const result = await run(routes(req), req, dbCommands);
  log(req, result);
  return render(result);
}
