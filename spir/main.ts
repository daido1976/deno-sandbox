import { Pera } from "https://deno.land/x/pera@0.0.2/mod.ts";
import { initDb } from "./db.ts";
import { Confirm } from "./handlers/confirms.ts";
import { Data } from "./handlers/data.ts";
import { Slot } from "./handlers/slots.ts";

export const db = initDb();
const app = new Pera();

app.get("/slots", (req, res) => {
  return Slot.searchHandler(req, res);
});
app.post("/confirm", (req, res) => {
  return Confirm.createHandler(req, res);
});
app.get("/data/dump", (req, res) => {
  return Data.dumpHandler(req, res);
});
app.post("/data/clean", (req, res) => {
  return Data.cleanHandler(req, res);
});

await app.run();
