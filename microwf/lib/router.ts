import { MicroResponse } from "./response.ts";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Routes = Map<Method, { [path: string]: MicroHandler | undefined }>;
type MicroHandler = (req: Request, res: MicroResponse) => Response;

export class Router {
  routes: Routes;

  constructor() {
    this.routes = new Map();
  }

  get(path: string, handler: MicroHandler) {
    const current = this.routes.get("GET");
    this.routes.set("GET", { ...current, [path]: handler });
  }

  post(path: string, handler: MicroHandler) {
    const current = this.routes.get("POST");
    this.routes.set("POST", { ...current, [path]: handler });
  }

  resolve(req: Request, res: MicroResponse): Response {
    const { pathname: path } = new URL(req.url);
    // TODO: as 使わずに、`toMethod(method: string): Method` 的な関数定義して変換する
    const method = req.method as Method;
    const pathRouter = this.routes.get(method);
    const notFound = res.status(404).text("not found");
    console.log("routes: ", this.routes);

    if (!pathRouter) {
      return notFound;
    }

    const handler = pathRouter[path];
    return handler ? handler(req, res) : notFound;
  }
}
