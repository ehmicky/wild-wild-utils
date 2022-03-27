import deepmerge from 'deepmerge'
import { isObject } from 'wild-wild-path'

import { mergeValues } from './common.js'

// Only own properties are currently merged, even if `inherited` is `true`.
// Non-enumerable properties are ignored.
const mergeValue = function (value, newValue, { mutate, classes, deep }) {
  return deep
    ? deepmerge(value, newValue, {
        clone: !mutate,
        isMergeableObject: boundIsMergeableObject.bind(undefined, classes),
      })
    : shallowMergeValue({ value, newValue, mutate, classes })
}

const boundIsMergeableObject = function (classes, value) {
  return isObject(value, classes) || Array.isArray(value)
}

// Unless `deep` is true, merging is shallow
const shallowMergeValue = function ({ value, newValue, mutate, classes }) {
  if (!isObject(value, classes) || !isObject(newValue, classes)) {
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
