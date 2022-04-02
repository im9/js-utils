import { assertEquals, assertMatch } from "../deps.ts";
import * as utils from "../src/index.ts";
import * as mocks from "../__tests__/mock.ts";

Deno.test("range()", () => {
  const actual = utils.range(3, 10);
  const expected = [3, 4, 5, 6, 7, 8, 9, 10];
  assertEquals(actual, expected);
});

Deno.test("times()", () => {
  const actual = utils.times(3, (_: any, i: number) => {
    return { id: i + 1 };
  });
  const expected = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];
  assertEquals(actual, expected);
});

Deno.test("removeDuplicates()", () => {
  const actual = utils.removeDuplicates([1, 2, 3, 3, 10, 10, "test", "test"]);
  const expected = [1, 2, 3, 10, "test"];
  assertEquals(actual, expected);
});

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

Deno.test("convertArrayToObject()", () => {
  const actual = utils.convertArrayToObject(mocks.fooList(10));
  const expected = [...Array(10).keys()].reduce((a, v) => {
    const id = v + 1;
    const data = { id, name: `user${id}` };
    return { ...a, [id]: data }
  }, {})
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

Deno.test("debounce()", async () => {
  const delayMs = 100;
  let x = 0;

  const adder = () => {
    x++;
  };

  const debouncedAdder = utils.debounce(adder, delayMs);

  debouncedAdder();

  assertEquals(x, 0);
  await utils.sleep(1);
  assertEquals(x, 1);
});

Deno.test("throttle()", async () => {
  const delayMs = 100;
  let x = 0;

  const adder = () => {
    x++;
  };

  const throttleAdder = utils.throttle(adder, delayMs);

  throttleAdder();
  throttleAdder();
  throttleAdder();
  assertEquals(x, 0);
  await utils.sleep(1);
  assertEquals(x, 1);
});

Deno.test("generateUID()", async () => {
  const actual = utils.generateUid(16);
  const expected = /^([a-zA-Z0-9]{16})$/;
  console.log(actual, "uid");
  assertMatch(actual, expected);
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

Deno.test("fib2() adds given number", () => {
  let actual = utils.fib2(1);
  let expected = 1;
  assertEquals(actual, expected);

  actual = utils.fib2(8);
  expected = 21;
  assertEquals(actual, expected);

  actual = utils.fib2(77);
  expected = 5527939700884757;
  assertEquals(actual, expected);
});

Deno.test("isPrimeNumber()", () => {
  let actual = utils.isPrimeNumber(1);
  let expected = false;
  assertEquals(actual, expected);

  actual = utils.isPrimeNumber(277);
  expected = true;
  assertEquals(actual, expected);

  actual = utils.isPrimeNumber(997);
  expected = true;
  assertEquals(actual, expected);
})