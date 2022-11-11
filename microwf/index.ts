import { App } from "./lib/app.ts";

const app = new App();

// TODO: handler の req の型を Request -> MicroRequest にする
app.get("/", (_req, res) => res.text("Hello world"));
app.get("/another", (req, res) => res.text(`url: ${req.url}`));
app.post("/json", (_req, res) => res.json({ message: "posted" }));
app.patch("/json", (_req, res) => res.json({ message: "patched" }));
app.delete("/json", (_req, res) => res.json({ message: "deleted" }));

await app.run();
