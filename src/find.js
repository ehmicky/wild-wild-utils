import { iterate } from 'wild-wild-path'

// Find the first non-missing property that matches a condition
// eslint-disable-next-line max-params
export const find = function (
  target,
  query,
  condition,
  { childFirst, roots, leaves, sort, entries, classes, inherited } = {},
) {
  // eslint-disable-next-line fp/no-loops
  for (const entry of iterate(target, query, {
    childFirst,
    roots,
    leaves,
    sort,
    missing: false,
    entries,
    classes,
    inherited,
  })) {
    // eslint-disable-next-line max-depth
    if (condition(entry)) {
      return entry
    }
  }
}
