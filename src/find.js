import { iterate } from 'wild-wild-path'

import { validateFunction } from './validate.js'

// Find the first non-missing property that matches a condition
export const find = (
  target,
  query,
  condition,
  {
    childFirst,
    roots,
    leaves,
    sort,
    entries,
    shallowArrays,
    classes,
    inherited,
  } = {},
  // eslint-disable-next-line max-params
) => {
  validateFunction(condition)

  // eslint-disable-next-line fp/no-loops
  for (const entry of iterate(target, query, {
    childFirst,
    roots,
    leaves,
    sort,
    missing: false,
    entries,
    shallowArrays,
    classes,
    inherited,
  })) {
    // eslint-disable-next-line max-depth
    if (condition(entry)) {
      return entry
    }
  }
}
