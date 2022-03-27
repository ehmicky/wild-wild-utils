import { mergeValues } from './common.js'

const pushValue = function (value, newValues, { mutate }) {
  if (!Array.isArray(value)) {
    return newValues
  }

  if (!mutate) {
    return [...value, ...newValues]
  }

  // eslint-disable-next-line fp/no-loops
  for (const newValue of newValues) {
    // eslint-disable-next-line fp/no-mutating-methods
    value.push(newValue)
  }

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

  // eslint-disable-next-line fp/no-loops, fp/no-let, fp/no-mutation
  for (let index = newValues.length - 1; index >= 0; index -= 1) {
    // eslint-disable-next-line fp/no-mutating-methods
    value.unshift(newValues[index])
  }

  return value
}

// Like `push()` but from the beginning
export const unshift = mergeValues.bind(undefined, unshiftValue)
