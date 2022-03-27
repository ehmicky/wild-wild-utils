import { set, remove } from 'wild-wild-path'

import { reduceParents } from './reduce.js'

// Returns an object with only the properties being queried.
export const pick = function (
  target,
  query,
  { sort, classes, inherited } = {},
) {
  const setFunc = pickEntry.bind(undefined, { classes, inherited })
  return reduceParents({
    setFunc,
    target,
    newTarget: {},
    query,
    roots: true,
    sort,
    classes,
    inherited,
  })
}

// Remove values not matching a query
// eslint-disable-next-line max-params
export const include = function (
  target,
  query,
  condition,
  { sort, entries, classes, inherited } = {},
) {
  const setFunc = pickEntry.bind(undefined, { classes, inherited })
  return reduceParents({
    setFunc,
    condition,
    target,
    newTarget: {},
    query,
    roots: false,
    sort,
    entries,
    classes,
    inherited,
  })
}

const pickEntry = function (
  { classes, inherited },
  newTarget,
  { path, value },
) {
  return set(newTarget, path, value, { mutate: true, classes, inherited })
}

// Remove values matching a query
// eslint-disable-next-line max-params
export const exclude = function (
  target,
  query,
  condition,
  { mutate, entries, classes, inherited } = {},
) {
  const setFunc = excludeEntry.bind(undefined, { mutate, classes, inherited })
  return reduceParents({
    setFunc,
    condition,
    target,
    newTarget: target,
    query,
    roots: false,
    sort: false,
    entries,
    classes,
    inherited,
  })
}

const excludeEntry = function (
  { mutate, classes, inherited },
  newTarget,
  { path },
) {
  return remove(newTarget, path, { mutate, classes, inherited })
}
