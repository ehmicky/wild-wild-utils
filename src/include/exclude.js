import { remove } from 'wild-wild-path'

import { validateFunction } from '../validate.js'

import { reduceParents } from './reduce.js'

// Remove values matching a query
export const exclude = (
  target,
  query,
  condition,
  { mutate, entries, shallowArrays, classes, inherited } = {},
  // eslint-disable-next-line max-params
) => {
  validateFunction(condition)
  const setFunc = excludeEntry.bind(undefined, {
    mutate,
    shallowArrays,
    classes,
    inherited,
  })
  return reduceParents({
    setFunc,
    condition,
    target,
    newTarget: target,
    query,
    roots: false,
    sort: false,
    entries,
    shallowArrays,
    classes,
    inherited,
  })
}

const excludeEntry = (
  { mutate, shallowArrays, classes, inherited },
  newTarget,
  { path },
) => remove(newTarget, path, { mutate, shallowArrays, classes, inherited })
