import { map } from '../map.js'

// Wrapper around map()
export const mergeValues = (
  mapFunc,
  target,
  query,
  newValue,
  {
    mutate,
    roots,
    leaves,
    missing = true,
    shallowArrays,
    classes,
    inherited,
  } = {},
  // eslint-disable-next-line max-params
) =>
  map(target, query, (value) => mapFunc(value, newValue, { mutate }), {
    mutate,
    roots,
    leaves,
    missing,
    entries: false,
    shallowArrays,
    classes,
    inherited,
  })
