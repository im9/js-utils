import * as utils from "../src/index.ts";

export const fooList = (n: number): any => {
  const foos = utils.times(n, (_: any, i: number) => {
    const id = i + 1
    return {
      id,
      name: `user${id}`,
    }
  })
  return foos
}
