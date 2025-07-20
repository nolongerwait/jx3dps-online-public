export function 函数缓存(func, resolver?) {
  // your code here
  const map = new Map()

  return function (...args) {
    const key = resolver ? resolver(...args) : args.join('_')
    if (map.has(key)) {
      return map.get(key)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cache = func.call(this, ...args)
    map.set(key, cache)
    return cache
  }
}
