import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { getSlotsRangeOf } from "./utils.ts";

Deno.test("getSlotsRangeOf returns the correct time slots", () => {
  const startTime = "2023-03-29T10:00:00.000+09:00";
  const endTime = "2023-03-29T12:00:00.000+09:00";

  const expected = [
    "2023/03/29 10:00",
    "2023/03/29 10:30",
    "2023/03/29 11:00",
    "2023/03/29 11:30",
  ];

  const actual = getSlotsRangeOf(startTime, endTime);
  assertEquals(actual, expected);
});
