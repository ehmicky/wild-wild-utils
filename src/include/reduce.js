import { isParentPath } from 'wild-wild-parser'
import { list } from 'wild-wild-path'

// Modify a target object multiple times for each matched property.
export const reduceParents = ({
  setFunc,
  condition,
  target,
  newTarget,
  query,
  sort,
  roots,
  entries: entriesOpt,
  shallowArrays,
  classes,
  inherited,
}) => {
  const entries = list(target, query, {
    childFirst: false,
    roots,
    leaves: false,
    sort,
    missing: false,
    entries: true,
    shallowArrays,
    classes,
    inherited,
  })
  const entriesA = filterEntries({ entries, condition, target, entriesOpt })
  return entriesA.reduce(setFunc, newTarget)
}

const filterEntries = ({ entries, condition, target, entriesOpt }) =>
  condition === undefined
    ? entries
    : entries
        .filter((entry) =>
          meetsCondition({ condition, entry, target, entriesOpt }),
        )
        .filter(hasNoParentSet)

const meetsCondition = ({ condition, entry, target, entriesOpt }) => {
  const entryA = entriesOpt ? entry : entry.value
  return condition(entryA, target)
}

// This is like the `roots` option. However, we cannot use that option since we
// need to apply `condition()` first.
const hasNoParentSet = ({ path: pathA }, indexA, entries) =>
  entries.every(
    (entryB, indexB) => indexA <= indexB || !isParentPath(entryB.path, pathA),
  )
