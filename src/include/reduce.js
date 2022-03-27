import { isParentPath } from 'wild-wild-parser'
import { list } from 'wild-wild-path'

// Modify a target object multiple times for each matched property.
export const reduceParents = function ({
  setFunc,
  condition,
  target,
  newTarget,
  query,
  sort,
  roots,
  entries: entriesOpt,
  classes,
  inherited,
}) {
  const entries = list(target, query, {
    childFirst: false,
    roots,
    leaves: false,
    sort,
    missing: false,
    entries: true,
    classes,
    inherited,
  })
  const entriesA = filterEntries({ entries, condition, target, entriesOpt })
  return entriesA.reduce(setFunc, newTarget)
}

const filterEntries = function ({ entries, condition, target, entriesOpt }) {
  return condition === undefined
    ? entries
    : entries
        .filter((entry) =>
          meetsCondition({ condition, entry, target, entriesOpt }),
        )
        .filter(hasNoParentSet)
}

const meetsCondition = function ({ condition, entry, target, entriesOpt }) {
  const entryA = entriesOpt ? entry : entry.value
  return condition(entryA, target)
}

// This is like the `roots` option. However, we cannot use that option since we
// need to apply `condition()` first.
const hasNoParentSet = function ({ path: pathA }, indexA, entries) {
  return entries.every(
    (entryB, indexB) => indexA <= indexB || !isParentPath(entryB.path, pathA),
  )
}
