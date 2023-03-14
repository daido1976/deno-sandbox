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

  return salesPoints.reduce<string[]>(
    (tags, salesPoint) =>
      salesPoint.requirement(apartment) ? [...tags, salesPoint.tag] : [...tags],
    []
  );
};
