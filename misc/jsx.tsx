/** @jsxImportSource npm:preact */
import { renderToString } from "npm:preact-render-to-string";

function handler(_req: Request): Response {
  return new Response(renderToString(<div>Hello world!</div>), {
    headers: { "content-type": "text/html" },
  });
}

Deno.serve(handler);
