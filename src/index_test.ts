import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import * as utils from "./index.ts";

Deno.test("toCamel() adds given snake case", () => {
  const actual = utils.toCamel("camel_case");
  const expected = "camelCase";
  assertEquals(actual, expected);
});

Deno.test("toSnake() adds given camel case", () => {
  const actual = utils.toSnake("snakeCase");
  const expected = "snake_case";
  assertEquals(actual, expected);
});

Deno.test("keysToCamel() adds given snake case object", () => {
  const actual = utils.keysToCamel({
    camel_case: 1,
    camel_case2: { child: "childValue" },
  });
  const expected = {
    camelCase: 1,
    camelCase2: { child: "childValue" },
  };
  assertEquals(actual, expected);
});

Deno.test("keysToSnake() adds given camel case object", () => {
  assertEquals(
    utils.keysToSnake({
      camelCase: 1,
      camelCase2: { child: "childValue" },
    }),
    {
      camel_case: 1,
      camel_case2: { child: "childValue" },
    }
  );
});

Deno.test("fib() adds given number", () => {
  let actual = utils.fib(1);
  let expected = 1;
  assertEquals(actual, expected);

  actual = utils.fib(8);
  expected = 21;
  assertEquals(actual, expected);

  actual = utils.fib(77);
  expected = 5527939700884757;
  assertEquals(actual, expected);
});
