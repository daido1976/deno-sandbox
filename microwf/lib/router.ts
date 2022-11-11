import { MicroResponse } from "./response.ts";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const defaultMethod = methods[0];
type Method = typeof methods[number];
type Routes = Map<Method, { [path: string]: MicroHandler | undefined }>;
export type MicroHandler = (req: Request, res: MicroResponse) => Response;

export class Router {
  #routes: Routes;

  constructor() {
    this.#routes = new Map();
  }

  register(method: Method, path: string, handler: MicroHandler) {
    const current = this.#routes.get(method);
    this.#routes.set(method, { ...current, [path]: handler });
  }

  resolve(req: Request, res: MicroResponse): Response {
    console.debug("[DEBUG] routes: ", this.#routes);
    const { pathname: path } = new URL(req.url);
    const method = this.#toMethod(req.method);
    const pathRouter = this.#routes.get(method);
    const notFound = res.status(404).text("not found");

    if (!pathRouter) {
      return notFound;
    }

    const handler = pathRouter[path];
    return handler ? handler(req, res) : notFound;
  }

  #toMethod(str: string): Method {
    // See. https://zenn.dev/hokaccha/articles/a665b7406b9773
    const isMethod = (s: string): s is Method => {
      return methods.includes(s as Method);
    };

    return isMethod(str) ? str : defaultMethod;
  }
}
