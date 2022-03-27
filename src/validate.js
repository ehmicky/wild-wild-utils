export const validateFunction = function (value) {
  if (typeof value !== 'function') {
    throw new TypeError(`Argument must be a function: ${value}`)
  }
}

export const validateArray = function (value) {
  if (!Array.isArray(value)) {
    throw new TypeError(`Argument must be an array: ${value}`)
  }
}
