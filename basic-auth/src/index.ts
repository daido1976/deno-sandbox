import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
import {
  config,
  DotenvConfig,
} from "https://deno.land/std@0.146.0/dotenv/mod.ts";
import { Ok, Err, Result, isErr } from "./result.ts";

type HandlerError = {
  status: number;
  statusText: string;
  reason: string;
};

// deno-lint-ignore require-await
async function handleRequest(
  request: Request,
  env: DotenvConfig
): Promise<Result<Response, HandlerError>> {
  const { protocol, pathname } = new URL(request.url);

  if (
    env.ENVIRONMENT !== "development" &&
    ("https:" !== protocol ||
      "https" !== request.headers.get("x-forwarded-proto"))
  ) {
    return Err(badRequest("Please use a HTTPS connection."));
  }

  switch (pathname) {
    case "/":
      return Ok(new Response("Anyone can access the homepage."));

    case "/logout":
      return Ok(new Response("Logged out.", { status: 401 }));

    case "/admin": {
      if (request.headers.has("Authorization")) {
        const result = basicAuthentication(request);
        if (isErr(result)) {
          return result;
        }
        const { user, pass } = result.payload;

        const verificationResult = verifyCredentials(user, pass, env);
        if (isErr(verificationResult)) {
          return verificationResult;
        }

        return Ok(
          new Response("You have private access 🎉", {
            status: 200,
            headers: {
              "Cache-Control": "no-store",
            },
          })
        );
      }

      return Ok(
        new Response("You need to login.", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',
          },
        })
      );
    }

    case "/favicon.ico":
    case "/robots.txt":
      return Ok(new Response(null, { status: 204 }));
  }

  return Ok(new Response("Not Found.", { status: 404 }));
}

const verifyCredentials = (
  user: string,
  pass: string,
  env: DotenvConfig
): Result<boolean, HandlerError> => {
  if (user !== env.BASIC_USER || pass !== env.BASIC_PASS) {
    return Err(unnauthorized("Invalid credentials."));
  }

  return Ok(true);
};

const basicAuthentication = (
  request: Request
): Result<{ user: string; pass: string }, HandlerError> => {
  const authorization = request.headers.get("Authorization") || "";
  const [scheme, encoded] = authorization.split(" ");

  if (!encoded || scheme !== "Basic") {
    return Err(badRequest("Malformed authorization header."));
  }

  // Decodes the base64 value and performs unicode normalization.
  const buffer = Uint8Array.from(atob(encoded), (character) =>
    character.charCodeAt(0)
  );
  const decoded = new TextDecoder().decode(buffer).normalize();

  // The username & password are split by the first colon.
  //=> example: "username:password"
  const index = decoded.indexOf(":");

  return Ok({
    user: decoded.substring(0, index),
    pass: decoded.substring(index + 1),
  });
};

const unnauthorized = (reason: string): HandlerError => {
  return { status: 401, statusText: "Unauthorized", reason };
};

const badRequest = (reason: string): HandlerError => {
  return { status: 400, statusText: "Bad Request", reason };
};

const errorResponse = (e: HandlerError): Response => {
  const message = e.reason || "Unknown Error";
  const headers = {
    "Content-Type": "text/plain;charset=UTF-8",
    "Cache-Control": "no-store",
    "Content-Length": message.length.toString(),
  };

  return new Response(message, {
    status: e.status || 500,
    statusText: e.statusText || undefined,
    headers,
  });
};

async function handler(request: Request): Promise<Response> {
  const env = await config({ defaults: "./basic-auth/.env.defaults" });
  const result = await handleRequest(request, env);
  switch (result.type) {
    case "Ok":
      return result.payload;
    case "Err":
      return errorResponse(result.payload);
  }
}

await serve(handler);
