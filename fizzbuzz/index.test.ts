import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.146.0/testing/bdd.ts";
import { fizzBuzzInternal } from "./index.ts";

describe("fizzBuzz", () => {
  it("fizzBuzz", () => {
    const expected = [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
      "16",
      "17",
      "Fizz",
      "19",
      "Buzz",
    ];
    const actual = fizzBuzzInternal(20);
    assertEquals(actual, expected);
  });
});
