import { App } from "./lib/app.ts";

const app = new App();

// TODO: app.get で呼べるようにする
// TODO: Request -> MicroRequest 型にする
app.router.get("/", (_req, res) => res.text("hello world"));
app.router.get("/another", (req, res) => res.text(`url: ${req.url}`));
app.router.post("/json", (_req, res) => res.json({ hoge: "fuga" }));

await app.run();
