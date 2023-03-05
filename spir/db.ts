export type Schedules = Map<Account, Slot[]>;

// e.g. "test1@example.com"
type Account = string;
// e.g. "2022/11/11 11:00"
type Slot = string;

export interface Db {
  addSchedule(account: string, slot: string): void;
  getAllSchedules(): Schedules;
  removeAllSchedules(): void;
  isReserved(account: Account, slot: Slot): boolean;
}

export class InMemoryDb implements Db {
  #schedules: Schedules = new Map();

  addSchedule(account: string, slot: string) {
    const current = this.#schedules.get(account) ?? [];
    this.#schedules.set(account, [...current, slot]);
  }
  getAllSchedules() {
    return this.#schedules;
  }
  removeAllSchedules() {
    this.#schedules.clear();
  }

  isReserved(account: Account, slot: Slot) {
    const current = this.#schedules.get(account);
    if (!current) return false;
    return current.includes(slot);
  }
}

export function initDb(): Db {
  return new InMemoryDb();
}
