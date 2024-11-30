import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { getTimeSlotsInRange } from "./utils.ts";

describe("getTimeSlotsInRange", () => {
  it("returns the correct time slots", () => {
    const startTime = "2023/03/29 10:00";
    const endTime = "2023/03/29 12:00";

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
    const startTime = "2023/03/29 10:00";
    const endTime = "2023/03/29 12:00";

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
    const startTime = "2023/03/29 10:00";
    const endTime = "2023/03/29 10:29";

    const expected: string[] = [];

    const actual = getTimeSlotsInRange(startTime, endTime);
    assertEquals(actual, expected);
  });
});
