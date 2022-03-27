// We split the core methods of `wild-wild-path` to keep it small, and provide
// additional utilities built on top of it.
import { list, get, set } from 'wild-wild-path'

// Map values matching a query.
// Missing entries are mapped too
//  - This allows logic such as adding default values
//  - However, if the map function does not modify the value, we do not set it
// We recurse from children to parents:
//  - This allows recursive logic such as cleaning up empty objects
//  - This also means newly set values are not recursed over:
//     - There are not many use cases for it
//        - When needed, this can also be done by the consumer logic
//     - This also avoids infinite recursion
// eslint-disable-next-line max-params
export const map = function (
  target,
  query,
  mapFunc,
  {
    mutate,
    roots,
    leaves,
    missing,
    entries: entriesOpt,
    classes,
    inherited,
  } = {},
) {
  const entries = list(target, query, {
    childFirst: true,
    roots,
    leaves,
    sort: false,
    missing,
    entries: true,
    classes,
    inherited,
  })
  return entries.reduce(
    (targetA, entry) =>
      mapEntry({
        mapFunc,
        target: targetA,
        entry,
        mutate,
        missing,
        entriesOpt,
        classes,
        inherited,
      }),
    target,
  )
}

const mapEntry = function ({
  mapFunc,
  target,
  entry,
  entry: { path },
  mutate,
  missing,
  entriesOpt,
  classes,
  inherited,
}) {
  const value = get(target, path, { missing, classes, inherited })
  const entryA = entriesOpt ? { ...entry, value } : value
  const mappedValue = mapFunc(entryA)
  return value === mappedValue
    ? target
    : set(target, path, mappedValue, { mutate, missing, classes, inherited })
}
