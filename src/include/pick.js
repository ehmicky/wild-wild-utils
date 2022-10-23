import { set } from 'wild-wild-path'

import { reduceParents } from './reduce.js'

// Returns an object with only the properties being queried.
export const pick = function (
  target,
  query,
  { sort, shallowArrays, classes, inherited } = {},
) {
  const setFunc = pickEntry.bind(undefined, {
    shallowArrays,
    classes,
    inherited,
  })
  return reduceParents({
    setFunc,
    target,
    newTarget: {},
    query,
    roots: true,
    sort,
    shallowArrays,
    classes,
    inherited,
  })
}

export const pickEntry = function (
  { shallowArrays, classes, inherited },
  newTarget,
  { path, value },
) {
  return set(newTarget, path, value, {
    mutate: true,
    shallowArrays,
    classes,
    inherited,
  })
}
