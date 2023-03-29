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

// NOTE: 業務なら素直に zod 使った方がいい
function isSearchParams(params: unknown): params is SearchParams {
  const { accounts, startTime, endTime } = params as SearchParams;
  return (
    typeof accounts === "string" &&
    typeof startTime === "string" &&
    typeof endTime === "string"
  );
}

const searchHandler: PeraHandler = (req, res) => {
  if (!isSearchParams(req.query)) {
    return res.status(400).json("invalid parameter!");
  }

  const { accounts: rawAccounts, startTime, endTime } = req.query;
  const accounts = rawAccounts.split(",");

  return res.json(Schedule.getSlotsBy(accounts, startTime, endTime));
};

export const Slot = {
  searchHandler,
};
