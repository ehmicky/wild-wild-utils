import { map } from '../map.js'

// Wrapper around map()
// eslint-disable-next-line max-params
export const mergeValues = function (
  mapFunc,
  target,
  query,
  newValues,
  { mutate, roots, leaves, missing, classes, inherited, deep } = {},
) {
  return map(
    target,
    query,
    (value) => mapFunc(value, newValues, { mutate, classes, deep }),
    { mutate, roots, leaves, missing, entries: false, classes, inherited },
  )
}
