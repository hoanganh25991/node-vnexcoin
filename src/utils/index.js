export const debugEnhance = (func, debugKey) => {
  if (!debugKey) return func
  if (!process[debugKey]) return func
  return (...args) => args
}
