import { db } from "../db.ts";
import { getTimeSlotsInRange } from "../utils.ts";

export type Schedules = {
  [key: Account]: Slot[];
};

// e.g. "test1@example.com"
type Account = string;
// e.g. "2022/11/11 11:00"
type Slot = string;

// NOTE: より汎用的な Result<T, E> が必要になったら修正する
export type ConfirmResult = "ok" | ConfirmErr;
type ConfirmErr = "conflict" | "unknown";

function getReservedSlotsBy(accounts: Account[]): Slot[] {
  return accounts.reduce<Slot[]>(
    (prev, account) => [...prev, ...db.getSlotsBy(account)],
    []
  );
}

function getSlotsInRange(startTime: string, endTime: string): Slot[] {
  return getTimeSlotsInRange(startTime, endTime, {
    intervalInMinutes: 30,
    formatString: "yyyy/MM/dd HH:mm",
  });
}

export const Schedule = {
  // TODO: startTime, endTime に適切な型をつける。Slot ではない気がする
  getSlotsBy: (
    account: Account | Account[],
    startTime: string,
    endTime: string
  ): Slot[] => {
    const accounts = Array.isArray(account) ? account : [account];
    const targetSlots = getSlotsInRange(startTime, endTime);
    const reservedSlots = getReservedSlotsBy(accounts);
    return targetSlots.filter((slot) => !reservedSlots.includes(slot));
  },
  confirm: (accounts: Account[], startTime: string): ConfirmResult => {
    const alreadyReserved = accounts.some((account) =>
      db.isReserved(account, startTime)
    );
    if (alreadyReserved) return "conflict";

    accounts.forEach((account) => db.addSchedule(account, startTime));
    return "ok";
  },
  dump: (): Schedules => Object.fromEntries(db.getAllSchedules()),
  clear: () => db.removeAllSchedules(),
};
