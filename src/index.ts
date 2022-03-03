interface StringKeyObject {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

export function isArray(a: []) {
  return Array.isArray(a);
}

// deno-lint-ignore no-explicit-any
export function isObject(o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
}

export function toCamel(s: string) {
  // deno-lint-ignore no-explicit-any
  return s.replace(/([-_][a-z])/gi, ($1: any) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

export function toSnake(s: string) {
  return s.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// deno-lint-ignore no-explicit-any
export function keysToCamel(o: any) {
  if (isObject(o)) {
    const n: StringKeyObject = {};

    Object.keys(o)?.forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    // deno-lint-ignore no-explicit-any
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
}

export function keysToSnake(obj: StringKeyObject) {
  if (typeof obj !== "object") return obj;

  for (const oldName in obj) {
    const newName = toSnake(oldName);
    if (newName !== oldName) {
      if (obj?.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }
    // Recursion
    if (typeof obj[newName] === "object") {
      obj[newName] = keysToSnake(obj[newName]);
    }
  }
  return obj;
}

/**
 * Get Fibonacci numbers
 * Fn = Fn-1 + Fn-2
 * @param v number
 * @returns
 */
export function fib(v: number) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= v; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}
