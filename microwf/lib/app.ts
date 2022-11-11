import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
import { outputLog } from "./logger.ts";
import { MicroResponse } from "./response.ts";
import { Router } from "./router.ts";

export class App {
  router: Router;
  response: MicroResponse;

  constructor() {
    this.router = new Router();
    this.response = new MicroResponse();
  }

  async run() {
    const handler = (req: Request) => {
      const res = this.router.resolve(req, this.response);
      outputLog(req, res);
      return res;
    };

    await serve(handler);
  }
}
