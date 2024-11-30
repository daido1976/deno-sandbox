// 次の 4 つの条件を満たした FizzBuzz を記述してください。
// (1) ユーザー側が指定した可変な数値(0<N≦65535 の範囲,  N は整数)を標準入力や変数等定義方法は問わずに、その数値まで（当該の数値を含む）の Fizz, Buzz, FizzBuzz あるいは未該当だった場合の数値が出力されること
// (2) % 及び剰余演算子及びそれに該当するようなビルトイン関数、クラス、メソッドなどを使用しないこと
// (3) / 及び除算演算子において数値型かどうかを判断するために数値型キャストや関数、クラス、メソッドを用いて割り切れる数であるかどうか判定しないこと。例えば Number.isInteger 等の使用は禁止です。
// (4) for 文や while 文、do-while 文のようなループ文に相当するシンタックスを使用しないこと (※ ただし、ユーザー定義ではないビルトイン関数やクラス、メソッドなどがループ文を内部的に使用してしまうものは例外とします)

// 除算演算子（割り算）なしバージョン
export const toFizzBuzzes = (n: number): string[] => {
  let step3 = 3;
  let step5 = 5;
  const arr = [...Array(n + 1).keys()].slice(1);

  const result = arr.map((i) => {
    if (i === step3 && i === step5) {
      step3 += 3;
      step5 += 5;
      return "FizzBuzz";
    } else if (i === step3) {
      step3 += 3;
      return "Fizz";
    } else if (i === step5) {
      step5 += 5;
      return "Buzz";
    } else {
      return i.toString();
    }
  });

  return result;
};

// 除算演算子（割り算）ありバージョン
export const toFizzBuzzes2 = (n: number): string[] => {
  const arr = [...Array(n + 1).keys()].slice(1);

  const result = arr.map((i) => {
    if (i === Math.floor(i / 15) * 15) {
      return "FizzBuzz";
    } else if (i === Math.floor(i / 3) * 3) {
      return "Fizz";
    } else if (i === Math.floor(i / 5) * 5) {
      return "Buzz";
    } else {
      return i.toString();
    }
  });

  return result;
};

// e.g. $ deno run -A fizzbuzz/index.ts 65535
if (import.meta.main) {
  (() => {
    const inputNumber = parseInt(Deno.args[0]);
    toFizzBuzzes(inputNumber).forEach((x) => console.log(x));
  })();
}

// e.g. $ deno bench --unstable fizzbuzz/index.ts -- 65535
// (() => {
//   Deno.bench("fizzbuzz", () => {
//     const inputNumber = parseInt(Deno.args[0]);
//     toFizzBuzzes(inputNumber).forEach((x) => console.log(x));
//   });
// })();

// ---
// 以下のように再帰でやろうとすると `Uncaught RangeError: Maximum call stack size exceeded` が出るのでダメ
// const toFizzBuzz = (n: number): string => {
//   if (n === Math.floor(n / 15) * 15) {
//     return "FizzBuzz";
//   } else if (n === Math.floor(n / 3) * 3) {
//     return "Fizz";
//   } else if (n === Math.floor(n / 5) * 5) {
//     return "Buzz";
//   } else {
//     return n.toString();
//   }
// };

// const printFizzBuzz = (current: number, until: number): void => {
//   if (current > until) {
//     return;
//   }
//   console.log(toFizzBuzz(current));
//   printFizzBuzz(current + 1, until);
// };

// // e.g. $ deno run -A fizzbuzz/index.ts 65535
// (() => {
//   const inputNumber = parseInt(Deno.args[0]);
//   printFizzBuzz(1, inputNumber);
// })();

// ---
// while 使うバージョン
// const printFizzBuzz = (until: number): void => {
//   let current = 1;
//   while (current <= until) {
//     console.log(toFizzBuzz(current));
//     current++;
//   }
// };

import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

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
    const actual = toFizzBuzzes(20);
    assertEquals(actual, expected);
  });

  it("fizzBuzz2", () => {
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
    const actual = toFizzBuzzes2(20);
    assertEquals(actual, expected);
  });
});
