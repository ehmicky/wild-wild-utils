import { validateFunction } from '../validate.js'

import { pickEntry } from './pick.js'
import { reduceParents } from './reduce.js'

// Remove values not matching a query
// eslint-disable-next-line max-params
export const include = function (
  target,
  query,
  condition,
  { sort, entries, shallowArrays, classes, inherited } = {},
) {
  validateFunction(condition)
  const setFunc = pickEntry.bind(undefined, {
    shallowArrays,
    classes,
    inherited,
  })
  return reduceParents({
    setFunc,
    condition,
    target,
    newTarget: {},
    query,
    roots: false,
    sort,
    entries,
    shallowArrays,
    classes,
    inherited,
  })
}
