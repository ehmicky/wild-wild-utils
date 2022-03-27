import { validateArray } from '../validate.js'

import { mergeValues } from './common.js'

const pushValue = function (value, newValueArray, { mutate }) {
  validateArray(newValueArray)

  if (!Array.isArray(value)) {
    return newValueArray
  }

  if (!mutate) {
    return [...value, ...newValueArray]
  }

  // eslint-disable-next-line fp/no-loops
  for (const newValue of newValueArray) {
    // eslint-disable-next-line fp/no-mutating-methods
    value.push(newValue)
  }

  return value
}

// Like `set()` but push an array of values to the target array instead
export const push = mergeValues.bind(undefined, pushValue)

const unshiftValue = function (value, newValueArray, { mutate }) {
  validateArray(newValueArray)

  if (!Array.isArray(value)) {
    return newValueArray
  }

  if (!mutate) {
    return [...newValueArray, ...value]
  }

  // eslint-disable-next-line fp/no-loops, fp/no-let, fp/no-mutation
  for (let index = newValueArray.length - 1; index >= 0; index -= 1) {
    // eslint-disable-next-line fp/no-mutating-methods
    value.unshift(newValueArray[index])
  }

  return value
}

// Like `push()` but from the beginning
export const unshift = mergeValues.bind(undefined, unshiftValue)
