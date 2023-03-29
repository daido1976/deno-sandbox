import { PeraHandler } from "https://deno.land/x/pera@0.0.2/src/router.ts";
import { Schedule } from "../models/schedule.ts";

type CreateParams = {
  accounts: string[];
  startTime: string;
};

// NOTE: 業務なら素直に zod 使った方がいい
function isCreateParams(params: unknown): params is CreateParams {
  const { accounts, startTime } = params as CreateParams;
  return (
    Array.isArray(accounts) &&
    accounts.every((x) => typeof x === "string") &&
    typeof startTime === "string"
  );
}

const createHandler: PeraHandler = async (req, res) => {
  const renderJson = (status: number, json: string) =>
    res.status(status).json(json);

  const params = await req.json();
  if (!isCreateParams(params)) {
    return renderJson(400, "invalid parameter!");
  }

  const result = Schedule.confirm(params.accounts, params.startTime);

  switch (result) {
    case "ok":
      return renderJson(201, "created!");
    case "conflict":
      return renderJson(409, "conflict!");
    case "unknown":
      return renderJson(500, "unknown error!");
  }
};

export const Confirm = {
  createHandler,
};
