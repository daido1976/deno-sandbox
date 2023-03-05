import { PeraHandler } from "https://deno.land/x/pera@0.0.2/src/router.ts";
import { Schedule } from "../models/schedule.ts";

type CreateParams = {
  accounts: string[];
  startTime: string;
};

const createHandler: PeraHandler = async (req, res) => {
  const params: CreateParams = await req.json();
  const result = Schedule.confirm(params.accounts, params.startTime);
  const render = (status: number, text: string) =>
    res.status(status).text(text);

  switch (result) {
    case "ok":
      return render(201, "created!");
    case "conflict":
      return render(409, "conflict!");
    case "unknown":
      return render(500, "unknown error!");
  }
};

export const Confirm = {
  createHandler,
};
