import { PeraHandler } from "https://deno.land/x/pera@0.0.2/src/router.ts";
import { Schedule } from "../models/schedule.ts";

type SearchParams = {
  // e.g. "test1@example.com", "test1@example.com,test2@example.com"
  accounts: string;
  // e.g. "2022/01/01 00:00"
  startTime: string;
  // e.g. "2022/01/01 00:00"
  endTime: string;
};

const searchHandler: PeraHandler = (req, res) => {
  const {
    accounts: rawAccounts,
    startTime,
    endTime,
  } = req.query as SearchParams;
  const accounts = rawAccounts.split(",");

  return res.json(Schedule.getSlotsBy(accounts, startTime, endTime));
};

export const Slot = {
  searchHandler,
};
