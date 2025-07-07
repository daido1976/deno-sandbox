/* ---------- Base class (no domain terms) ---------- */
class Base {
  constructor(public id: string) {}
}

/* ---------- Tagged variants ---------- */
type VariantA = Base & {
  tag: "A";
  count: number;
  done: boolean;
};

type VariantB = Base & {
  tag: "B";
};

type Variant = VariantA | VariantB;

/* ---------- Create instances (no Object.assign side-effects) ---------- */

/* B-type object */
const objB: VariantB = Object.assign(new Base("id-B"), { tag: "B" as const });

/* A-type object */
const objA: VariantA = Object.assign(new Base("id-A"), {
  tag: "A" as const,
  count: 2,
  done: false,
});

/* ---------- Use as discriminated union ---------- */
const list: Variant[] = [objA, objB];

for (const item of list) {
  if (item.tag === "A") {
    console.log("A-count =", item.count, "done?", item.done);
  } else {
    console.log("B-id =", item.id);
  }
}
