import deepmerge from 'deepmerge'
import isPlainObj from 'is-plain-obj'

import { mergeValues } from './common.js'

// Only own properties are currently merged, even if `inherited` is `true`.
// Non-enumerable properties are ignored.
const mergeValue = function (value, newValue, { mutate, classes, deep }) {
  const isMergeableObject = getIsMergeableObject(classes)
  return deep
    ? deepmerge(value, newValue, { clone: !mutate, isMergeableObject })
    : shallowMergeValue({ value, newValue, mutate, isMergeableObject })
}

// Use similar recursion logic as `iterate()` depending on `classes`
const getIsMergeableObject = function (classes) {
  return classes ? isObjArr : isPlainObjArr
}

const isObjArr = function (value) {
  return typeof value === 'object' && value !== null
}

const isPlainObjArr = function (value) {
  return isPlainObj(value) || Array.isArray(value)
}

// Unless `deep` is true, merging is shallow
const shallowMergeValue = function ({
  value,
  newValue,
  mutate,
  isMergeableObject,
}) {
  if (!isMergeableObject(value)) {
    return newValue
  }

  if (!mutate) {
    return { ...value, ...newValue }
  }

  Object.keys(newValue).forEach((key) => {
    // eslint-disable-next-line no-param-reassign, fp/no-mutation
    value[key] = newValue[key]
  })
  return value
}

// Merge object values
export const merge = mergeValues.bind(undefined, mergeValue)
