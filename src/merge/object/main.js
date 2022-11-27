import declarativeMerge from 'declarative-merge'

import { mergeValues } from '../common.js'

// The `inherited`, `classes` and `mutate` options:
//  - Impact which properties are selected and how they are set
//  - But do not impact the merging logic itself, where those options are always
//    considered `false`.
// Non-enumerable properties are ignored.
const mergeValue = function (value, newValue) {
  return declarativeMerge(value, newValue)
}

// Merge object values
export const merge = mergeValues.bind(undefined, mergeValue)
