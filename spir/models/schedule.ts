export type Schedules = {
  [key: Account]: Slot[];
};

// e.g. "test1@example.com"
type Account = string;
// e.g. "2022/11/11 11:00"
type Slot = string;

// NOTE: より汎用的な Result<T, E> が必要になったら修正する
type ConfirmResult = "ok" | ConfirmErr;
type ConfirmErr = "conflict" | "unknown";

export class Schedule {
  // TODO: startTime, endTime に適切な型をつける。Slot ではない気がする
  getSlotsBy(account: Account, startTime: string, endTime: string): Slot[] {
    return [];
  }
  confirm(accounts: Account[], startTime: string): ConfirmResult {
    return "ok";
  }
  dump(): Schedules {
    return {};
  }
  clear() {}
}
