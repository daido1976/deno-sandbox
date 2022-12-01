// This example is not useful...
const f = <T extends string | number>(v: unknown): T => {
  const r = v as T;
  return r;
};

console.log(typeof f<string>("1")); // string
console.log(typeof f<number>("1")); // string
