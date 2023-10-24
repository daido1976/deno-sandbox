/** @jsxImportSource npm:preact */
import { renderToString } from "npm:preact-render-to-string";

Deno.serve(
  (_req: Request) =>
    new Response(renderToString(<div>Hello, world!</div>), {
      headers: { "content-type": "text/html" },
    })
);
