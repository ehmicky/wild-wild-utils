import { serializePath } from 'wild-wild-parser'
import { list } from 'wild-wild-path'

// Flattens all deep properties into a shallow object where each key is a path
export const flatten = function (
  target,
  { shallowArrays, classes, inherited } = {},
) {
  const entries = list(target, '**', {
    childFirst: false,
    roots: false,
    leaves: true,
    sort: true,
    missing: false,
    entries: true,
    shallowArrays,
    classes,
    inherited,
  })
  return Object.fromEntries(entries.map(flattenEntry))
}

const flattenEntry = function ({ path, value }) {
  return [serializePath(path), value]
}
