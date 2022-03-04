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

Deno.test("toKebab() adds given keba case", () => {
  const actual = utils.toKebab("snakeCase");
  const expected = "snake-case";
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

Deno.test("cleanEmptyObj()", () => {
  const actual = utils.cleanEmptyObj({
    prop: "",
    prop2: "test",
    prop3: null,
  });
  const expected = {
    prop2: "test",
  };
  assertEquals(actual, expected);
});

Deno.test("toggle()", () => {
  const actual = utils.toggle([1, 2, 3], 2);
  const expected = [1, 3];
  assertEquals(actual, expected);
});

Deno.test("highestValFromObj()", () => {
  const actual = utils.highestValFromObj([
    { label: "test1", value: 1 },
    { label: "test2", value: 200 },
    { label: "test3", value: 3 },
  ]);
  const expected = { label: "test2", value: 200 };
  assertEquals(actual, expected);
});

Deno.test("lowestValFromObj()", () => {
  const actual = utils.lowestValFromObj([
    { label: "test1", value: 0.1 },
    { label: "test2", value: 200 },
    { label: "test3", value: 3 },
  ]);
  const expected = { label: "test1", value: 0.1 };
  assertEquals(actual, expected);
});

Deno.test("zenkaku()", () => {
  const actual = utils.zenkaku("zenkaku123");
  const expected = "ｚｅｎｋａｋｕ１２３";
  assertEquals(actual, expected);
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
