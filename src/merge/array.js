import { mergeValues } from './common.js'

const pushValue = function (value, newValues, opts) {
  if (!Array.isArray(value)) {
    return newValues
  }

  if (!opts.mutate) {
    return [...value, ...newValues]
  }

  newValues.forEach((newValue) => {
    // eslint-disable-next-line fp/no-mutating-methods
    value.push(newValue)
  })
  return value
}

// Like `set()` but push an array of values to the target array instead
export const push = mergeValues.bind(undefined, pushValue)

const unshiftValue = function (value, newValues, { mutate }) {
  if (!Array.isArray(value)) {
    return newValues
  }

  if (!mutate) {
    return [...newValues, ...value]
  }

  newValues.forEach((newValue) => {
    // eslint-disable-next-line fp/no-mutating-methods
    value.unshift(newValue)
  })
  return value
}

// Like `push()` but from the beginning
export const unshift = mergeValues.bind(undefined, unshiftValue)
