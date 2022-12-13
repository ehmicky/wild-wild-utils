export const validateFunction = (value) => {
  if (typeof value !== 'function') {
    throwInvalidArg(value, 'a function')
  }
}

export const validateArray = (value) => {
  if (!Array.isArray(value)) {
    throwInvalidArg(value, 'an array')
  }
}

const throwInvalidArg = (value, errorPrefix) => {
  throw new TypeError(`Argument must be ${errorPrefix}: ${value}`)
}
