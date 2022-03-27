export const validateFunction = function (value) {
  if (typeof value !== 'function') {
    throw new TypeError(`Argument must be a function: ${value}`)
  }
}
