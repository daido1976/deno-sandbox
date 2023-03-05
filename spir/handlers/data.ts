import { PeraHandler } from "https://deno.land/x/pera@0.0.2/src/router.ts";
import { Schedule } from "../models/schedule.ts";

const dumpHandler: PeraHandler = (_req, res) => {
  return res.json(Schedule.dump());
};
const cleanHandler: PeraHandler = (_req, res) => {
  Schedule.clear();
  return res.status(200).text("cleaned up!");
};

export const Data = {
  dumpHandler,
  cleanHandler,
};
