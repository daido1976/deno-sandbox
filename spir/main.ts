import { Pera } from "https://deno.land/x/pera@0.0.2/mod.ts";
import { initDb } from "./db.ts";

export const db = initDb();
const app = new Pera();

app.get("/slots", (req, res) => {
  // TODO
  return res.text("");
});
app.post("/confirm", (req, res) => {
  // TODO
  return res.text("");
});
app.get("/data/dump", (req, res) => {
  // TODO
  return res.text("");
});
app.post("/data/clean", (req, res) => {
  // TODO
  return res.text("");
});

await app.run();
