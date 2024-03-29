import { basename, extname, join } from "./deps.ts";
import { MicroHandler } from "./router.ts";

const MIME_TYPES: { [key: string]: string } = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = "./public";

// TODO: http://localhost:8000/path/index.css にアクセスした時に not found にする（= /index.css の時しか返さない）
export const staticHandler: MicroHandler = (req, res) => {
  // TODO: If it is not GET method, return early.
  const toLocalPath = (path: string) => {
    const fileName = basename(path);
    const paths = [STATIC_PATH, fileName];
    if (path === "/") paths.push("index.html");
    return join(...paths);
  };

  const toExt = (p: string) => extname(p).substring(1).toLowerCase();

  const { pathname } = new URL(req.url);
  const path = toLocalPath(pathname);
  let data: Uint8Array;
  try {
    // TODO: to async
    data = Deno.readFileSync(path);
  } catch (_e: unknown) {
    const notFound = res.status(404).text("not found");
    return notFound;
  }

  // TOOD: to type safety
  const mimeType = MIME_TYPES[toExt(path)] ?? MIME_TYPES.default;
  return new Response(data, {
    headers: {
      "Content-Type": mimeType,
    },
    status: 200,
  });
};
