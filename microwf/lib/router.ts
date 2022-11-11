import { MicroResponse } from "./response.ts";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Routes = Map<Method, { [path: string]: MicroHandler | undefined }>;
export type MicroHandler = (req: Request, res: MicroResponse) => Response;

export class Router {
  routes: Routes;

  constructor() {
    this.routes = new Map();
  }

  register(method: Method, path: string, handler: MicroHandler) {
    const current = this.routes.get(method);
    this.routes.set(method, { ...current, [path]: handler });
  }

  resolve(req: Request, res: MicroResponse): Response {
    console.debug("[DEBUG] routes: ", this.routes);
    const { pathname: path } = new URL(req.url);
    // TODO: as 使わずに、`toMethod(method: string): Method` 的な関数定義して変換する
    const method = req.method as Method;
    const pathRouter = this.routes.get(method);
    const notFound = res.status(404).text("not found");

    if (!pathRouter) {
      return notFound;
    }

    const handler = pathRouter[path];
    return handler ? handler(req, res) : notFound;
  }
}
