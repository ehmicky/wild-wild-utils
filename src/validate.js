export const validateFunction = function (value) {
  if (typeof value !== 'function') {
    throwInvalidArg(value, 'a function')
  }
}

export const validateArray = function (value) {
  if (!Array.isArray(value)) {
    throwInvalidArg(value, 'an array')
  }
}

const throwInvalidArg = function (value, errorPrefix) {
  throw new TypeError(`Argument must be ${errorPrefix}: ${value}`)
}
