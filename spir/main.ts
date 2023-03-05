import { Pera } from "https://deno.land/x/pera@0.0.2/mod.ts";
import { initDb } from "./db.ts";
import { Confirm } from "./handlers/confirms.ts";
import { Data } from "./handlers/data.ts";
import { Slot } from "./handlers/slots.ts";

export const db = initDb();
const app = new Pera();

app.get("/slots", Slot.searchHandler);
app.post("/confirm", Confirm.createHandler);
app.get("/data/dump", Data.dumpHandler);
app.post("/data/clean", Data.cleanHandler);

await app.run();
