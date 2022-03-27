import { validateArray } from '../validate.js'

import { mergeValues } from './common.js'

// Like `set()` but push|unshift an array of values to the target array instead
// eslint-disable-next-line max-params
const mergeArrayValues = function (
  mergeFunc,
  target,
  query,
  newValueArray,
  opts,
) {
  validateArray(newValueArray)
  return mergeValues(mergeFunc, target, query, newValueArray, opts)
}

const pushValue = function (value, newValueArray, { mutate }) {
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

export const push = mergeArrayValues.bind(undefined, pushValue)

const unshiftValue = function (value, newValueArray, { mutate }) {
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
export const unshift = mergeArrayValues.bind(undefined, unshiftValue)
