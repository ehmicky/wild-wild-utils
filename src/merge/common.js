import { map } from '../map.js'

// Wrapper around map()
// eslint-disable-next-line max-params
export const mergeValues = function (
  mapFunc,
  target,
  query,
  newValues,
  opts = {},
) {
  return map(target, query, (value) => mapFunc(value, newValues, opts), {
    ...opts,
    entries: false,
  })
}
