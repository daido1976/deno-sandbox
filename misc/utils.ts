function arrayColumn<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("arrayColumn - Basic Test", () => {
  type User = {
    id: number;
    name: string;
    email: string;
  };

  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];
  assertEquals(arrayColumn(users, "name"), ["Alice", "Bob", "Charlie"]);
  assertEquals(arrayColumn(users, "id"), [1, 2, 3]);
});
