import { db } from "../db.ts";

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

// TODO: Add test & refactor
function getSlotsRangeOf(startTime: string, endTime: string): string[] {
  const startDate: Date = new Date(startTime);
  const endDate: Date = new Date(endTime);

  const timeSlotCount: number =
    (endDate.getTime() - startDate.getTime()) / (30 * 60 * 1000);

  return Array.from({ length: timeSlotCount }, (_, index) => {
    const timeSlotDate = new Date(startDate.getTime() + index * 30 * 60 * 1000);
    return timeSlotDate.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  });
}

function getReservedSlotsBy(accounts: Account[]): Slot[] {
  return accounts.reduce<Slot[]>(
    (prev, account) => [...prev, ...db.getSlotsBy(account)],
    []
  );
}

export const Schedule = {
  // TODO: startTime, endTime に適切な型をつける。Slot ではない気がする
  getSlotsBy: (
    account: Account | Account[],
    startTime: string,
    endTime: string
  ): Slot[] => {
    const accounts = Array.isArray(account) ? account : [account];
    const targetSlots = getSlotsRangeOf(startTime, endTime);
    const reservedSlots = getReservedSlotsBy(accounts);
    return targetSlots.filter((slot) => !reservedSlots.includes(slot));
  },
  confirm: (accounts: Account[], startTime: string): ConfirmResult => {
    const alreadyReserved = accounts.some((account) =>
      db.isReserved(account, startTime)
    );
    if (alreadyReserved) {
      return "conflict";
    }
    accounts.forEach((account) => db.addSchedule(account, startTime));
    return "ok";
  },
  dump: (): Schedules => {
    return Object.fromEntries(db.getAllSchedules());
  },
  clear: () => {
    db.removeAllSchedules();
  },
};
