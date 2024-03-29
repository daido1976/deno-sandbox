import { App } from "./lib/mod.ts";

const app = new App();

// NOTE: public 以下のディレクトリに置いたファイルは自動でルートディレクトリ（/）にマウントされてホストされる
app.get("/hello", (_req, res) => res.text("Hello world"));
app.get("/another", (req, res) => res.text(`url: ${req.url}`));
app.post("/json", (_req, res) => res.json({ message: "posted" }));
app.patch("/json", (_req, res) => res.json({ message: "patched" }));
app.delete("/json", (_req, res) => res.json({ message: "deleted" }));

await app.run();
