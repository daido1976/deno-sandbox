import { db } from "../main.ts";

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

// TODO: メソッド記法やめる
export const Schedule = {
  // TODO: startTime, endTime に適切な型をつける。Slot ではない気がする
  getSlotsBy(
    account: Account | Account[],
    _startTime: string,
    _endTime: string
  ): Slot[] {
    const _accounts = Array.isArray(account) ? account : [account];
    // TODO:
    // 1. startTimeとendTimeをタプルで渡すとその間のslotを全て返す関数（純粋関数）
    // 2. 指定したアカウント群で予約済みのslotを返す関数
    // 1, 2 の差の配列をレスポンスとする
    return [];
  },
  confirm(accounts: Account[], startTime: string): ConfirmResult {
    const alreadyReserved = accounts.some((account) =>
      db.isReserved(account, startTime)
    );
    if (alreadyReserved) {
      return "conflict";
    }
    accounts.forEach((account) => db.addSchedule(account, startTime));
    return "ok";
  },
  dump(): Schedules {
    return Object.fromEntries(db.getAllSchedules());
  },
  clear() {
    db.removeAllSchedules();
  },
};
