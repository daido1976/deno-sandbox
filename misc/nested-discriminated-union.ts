// ========== ネスト型の例 ==========
type NestedEntityA =
  | { type: "foo"; fooData: number }
  | { type: "bar"; barData: string };

type NestedEntity =
  | { kind: "A"; detail: NestedEntityA }
  | { kind: "B"; alive: boolean };

const handleNestedEntityA = (entity: NestedEntityA): void => {
  switch (entity.type) {
    case "foo":
      console.log(`Foo data: ${entity.fooData}`);
      break;
    case "bar":
      console.log(`Bar data: ${entity.barData}`);
      break;
  }
};

export const handleNested = (entity: NestedEntity): void => {
  switch (entity.kind) {
    case "A":
      handleNestedEntityA(entity.detail);
      break;
    case "B":
      console.log(`Entity B is ${entity.alive ? "alive" : "dead"}`);
      break;
  }
};

// ========== フラット型の例 ==========
type FlatEntity =
  | { kind: "A"; type: "foo"; fooData: number }
  | { kind: "A"; type: "bar"; barData: string }
  | { kind: "B"; alive: boolean };

export const handleFlat = (entity: FlatEntity): void => {
  switch (entity.kind) {
    case "A":
      switch (entity.type) {
        case "foo":
          console.log(`Foo data: ${entity.fooData}`);
          break;
        case "bar":
          console.log(`Bar data: ${entity.barData}`);
          break;
      }
      break;
    case "B":
      console.log(`Entity B is ${entity.alive ? "alive" : "dead"}`);
      break;
  }
};
