import { App } from "./lib/app.ts";

const app = new App();

// TODO: Request -> MicroRequest 型にする
app.get("/", (_req, res) => res.text("hello world"));
app.get("/another", (req, res) => res.text(`url: ${req.url}`));
app.post("/json", (_req, res) => res.json({ hoge: "fuga" }));

await app.run();
