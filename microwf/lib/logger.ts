import { format } from "https://deno.land/std@0.146.0/datetime/mod.ts";

export function outputLog(req: Request, res: Response) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  console.log(
    `${format(new Date(), "yyyy-MM-dd HH:mm:ss")} ${method} ${pathname} ${
      res.status
    }`
  );
}
