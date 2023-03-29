import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.181.0/testing/bdd.ts";
import { getTimeSlotsInRange } from "./utils.ts";

describe("getTimeSlotsInRange", () => {
  it("returns the correct time slots", () => {
    const startTime = "2023-03-29T10:00:00.000+09:00";
    const endTime = "2023-03-29T12:00:00.000+09:00";

    const expected = [
      "2023/03/29 10:00",
      "2023/03/29 10:30",
      "2023/03/29 11:00",
      "2023/03/29 11:30",
    ];

    const actual = getTimeSlotsInRange(startTime, endTime);
    assertEquals(actual, expected);
  });

  it("returns the correct time slots with options", () => {
    const startTime = "2023-03-29T10:00:00.000+09:00";
    const endTime = "2023-03-29T12:00:00.000+09:00";

    const expected = [
      "2023/03/29 10:00",
      "2023/03/29 10:15",
      "2023/03/29 10:30",
      "2023/03/29 10:45",
      "2023/03/29 11:00",
      "2023/03/29 11:15",
      "2023/03/29 11:30",
      "2023/03/29 11:45",
    ];

    const actual = getTimeSlotsInRange(startTime, endTime, {
      intervalInMinutes: 15,
      formatString: "yyyy/MM/dd HH:mm",
    });
    assertEquals(actual, expected);
  });

  it("returns empty", () => {
    const startTime = "2023-03-29T10:00:00.000+09:00";
    const endTime = "2023-03-29T10:29:00.000+09:00";

    const expected: string[] = [];

    const actual = getTimeSlotsInRange(startTime, endTime);
    assertEquals(actual, expected);
  });
});
