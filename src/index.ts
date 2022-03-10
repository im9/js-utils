interface StringKeyObject {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

export function sleep(second: number) {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
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

export function toKebab(s: string) {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function keysToCamel(o: StringKeyObject): StringKeyObject {
  if (isObject(o)) {
    const n: StringKeyObject = {};
    Object.keys(o).forEach((k) => (n[toCamel(k)] = keysToCamel(o[k])));
    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => keysToCamel(i));
  }
  return o;
}

export function keysToSnake(o: StringKeyObject): StringKeyObject {
  if (isObject(o)) {
    const n: StringKeyObject = {};
    Object.keys(o).forEach((k) => (n[toSnake(k)] = keysToSnake(o[k])));
    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => keysToSnake(i));
  }
  return o;
}

export function cleanEmptyObj(o: StringKeyObject): StringKeyObject {
  return Object.entries(o).reduce((a: StringKeyObject, [k, v]) => {
    return v === "" || v === null || v === undefined ? a : ((a[k] = v), a);
  }, {});
}

// deno-lint-ignore no-explicit-any
export function toggle(arr: any, value: any) {
  return arr?.includes(value)
    ? // deno-lint-ignore no-explicit-any
      arr.filter((v: any) => v !== value)
    : arr.concat(value);
}

export function highestValFromObj(obj: StringKeyObject, key = "value") {
  return Object.values(obj).reduce((prev, current) => {
    return prev[key] > current[key] ? prev : current;
  });
}

export function lowestValFromObj(obj: StringKeyObject, key = "value") {
  return Object.values(obj).reduce((prev, current) => {
    return prev[key] < current[key] ? prev : current;
  });
}

export function zenkaku(value: string | number) {
  return String(value).replace(/[A-Za-z0-9]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}

type Handler = <T>(t: T) => void;

export function debounce(callback: Handler, ms: number) {
  let timer: number;
  return function <T>(...t: T[]) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(t), ms);
  };
}

export function throttle(callback: Handler, ms: number) {
  let timer: number;
  return function <T>(...t: T[]) {
    if (timer) return;
    timer = setTimeout(() => {
      callback(t);
      timer = 0;
    }, ms);
  };
}

export const fileToBlob = async (file: File) => {
  return new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
};

export const blobToBase64 = async (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

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
