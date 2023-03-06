// $ deno bench stress-test/find.bench.ts
let arr: number[];
Deno.bench("Generate array", () => {
  arr = Array.from({ length: 1000000 }, (_, i) => i);
});
let result = false;
Deno.bench("Find element", () => {
  result = arr.some((x) => x === 999999);
});
console.log({ result });
