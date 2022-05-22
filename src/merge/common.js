import { map } from '../map.js'

// Wrapper around map()
// eslint-disable-next-line max-params
export const mergeValues = function (
  mapFunc,
  target,
  query,
  newValue,
  { mutate, roots, leaves, missing = true, classes, inherited } = {},
) {
  return map(target, query, (value) => mapFunc(value, newValue, { mutate }), {
    mutate,
    roots,
    leaves,
    missing,
    entries: false,
    classes,
    inherited,
  })
}
