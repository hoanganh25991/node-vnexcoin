export const debugEnhance = (func, debugKey) => {
  if (!process[debugKey]) return func
  return (...args) => args
}
