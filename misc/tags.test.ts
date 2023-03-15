import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.146.0/testing/bdd.ts";
import {
  ApartmentKlass,
  buildTagsDeclarative,
  buildTagsImperative,
} from "./tags.ts";

describe("tags", () => {
  it("tags if conditions are met", () => {
    const apartment = {
      metersToStation: 400,
      ageOfBuilding: 5,
      options: ["ShoeLocker", "AutoLock"],
    };

    assertEquals(buildTagsImperative(apartment), ["駅近", "セキュリティ充実"]);
    assertEquals(buildTagsDeclarative(apartment), ["駅近", "セキュリティ充実"]);
  });

  it("do not tags, if the condition is not met", () => {
    const apartment = {
      metersToStation: 1200,
      ageOfBuilding: 10,
      options: ["ShoeLocker"],
    };

    assertEquals(buildTagsImperative(apartment), []);
    assertEquals(buildTagsDeclarative(apartment), []);
  });
});

describe("tags with class", () => {
  it("tags if conditions are met", () => {
    const apartment = {
      metersToStation: 400,
      ageOfBuilding: 5,
      options: ["ShoeLocker", "AutoLock"],
    };

    assertEquals(new ApartmentKlass(apartment).getTags(), [
      "駅近",
      "セキュリティ充実",
    ]);
  });

  it("do not tags, if the condition is not met", () => {
    const apartment = {
      metersToStation: 1200,
      ageOfBuilding: 10,
      options: ["ShoeLocker"],
    };

    assertEquals(new ApartmentKlass(apartment).getTags(), []);
  });
});
