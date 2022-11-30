// Functions used as test helpers
export const returnFalse = function () {
  return false
}

export const returnTrue = function () {
  return true
}

export const isOne = function (value) {
  return value === 1
}

export const isNotOne = function (value) {
  return value !== 1
}

export const isObject = function (value) {
  return typeof value === 'object'
}

export const isNotObject = function (value) {
  return typeof value !== 'object'
}

export const isNamedTwo = function ({ path }) {
  return path[0] === 'two'
}

export const identity = function (value) {
  return value
}
