import { isObject } from 'wild-wild-path'

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

export const validateObject = function (value, classes) {
  if (isObject(value, classes)) {
    return
  }

  const errorPrefix = classes ? 'an object' : 'a plain object'
  throwInvalidArg(value, errorPrefix)
}

const throwInvalidArg = function (value, errorPrefix) {
  throw new TypeError(`Argument must be ${errorPrefix}: ${value}`)
}
