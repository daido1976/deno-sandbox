// See. https://twitter.com/EcmaKawarabe/status/1635588571427143680
type Apartment = {
  metersToStation: number;
  ageOfBuilding: number;
  options: string[];
};

export const buildTagsImperative = (apartment: Apartment) => {
  const result = [];
  if (apartment.metersToStation < 1000) {
    result.push("駅近");
  }
  if (apartment.ageOfBuilding < 5) {
    result.push("築浅");
  }
  if (apartment.options.includes("AutoLock")) {
    result.push("セキュリティ充実");
  }

  return result;
};

type SalesPoints = {
  requirement: (apartment: Apartment) => boolean;
  tag: string;
}[];

export const buildTagsDeclarative = (apartment: Apartment): string[] => {
  const salesPoints: SalesPoints = [
    {
      requirement: (a) => a.metersToStation < 1000,
      tag: "駅近",
    },
    {
      requirement: (a) => a.ageOfBuilding < 5,
      tag: "築浅",
    },
    {
      requirement: (a) => a.options.includes("AutoLock"),
      tag: "セキュリティ充実",
    },
  ];

  return salesPoints.flatMap((salesPoint) =>
    salesPoint.requirement(apartment) ? [salesPoint.tag] : []
  );
};

// with class
export class ApartmentKlass {
  #metersToStation: number;
  #ageOfBuilding: number;
  #options: string[];

  constructor(args: Apartment) {
    this.#metersToStation = args.metersToStation;
    this.#ageOfBuilding = args.ageOfBuilding;
    this.#options = args.options;
  }

  isNearStation() {
    return this.#metersToStation < 1000;
  }

  isNew() {
    return this.#ageOfBuilding < 5;
  }

  isSecure() {
    return this.#options.includes("AutoLock");
  }

  getTags() {
    const salesPoints: [boolean, string][] = [
      [this.isNearStation(), "駅近"],
      [this.isNew(), "築浅"],
      [this.isSecure(), "セキュリティ充実"],
    ];

    return salesPoints.reduce<string[]>(
      (tags, salesPoint) =>
        salesPoint[0] ? [...tags, salesPoint[1]] : [...tags],
      []
    );
  }
}

import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

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
