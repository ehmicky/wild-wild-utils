import { expectType, expectNotType } from 'tsd'
import type { Target, Entry } from 'wild-wild-path'

import {
  map,
  find,
  pick,
  include,
  exclude,
  merge,
  push,
  unshift,
  flatten,
} from 'wild-wild-utils'

const mapValue = (value: any): any => value
const mapEntry = (entry: Entry): Entry => entry
const testValue = (value: any): boolean => true
const testEntry = (entry: Entry): boolean => true

expectType<Target>(map({}, 'prop', mapValue))
map({}, ['prop'], mapEntry)
map({}, 'prop', mapEntry, { entries: true })
// @ts-expect-error
map(true, 'prop', mapEntry)
// @ts-expect-error
map({}, true, mapEntry)
// @ts-expect-error
map({}, 'prop', true)
// @ts-expect-error
map({}, 'prop', mapEntry, true)

expectType<any>(find({}, 'prop', testValue))
expectType<Entry>(find({}, 'prop', testEntry, { entries: true }))
expectNotType<Entry>(find({}, 'prop', testEntry, { entries: false }))
find({}, ['prop'], testValue)
// @ts-expect-error
find(true, 'prop', testEntry)
// @ts-expect-error
find({}, true, testEntry)
// @ts-expect-error
find({}, 'prop', true)
// @ts-expect-error
find({}, 'prop', testEntry, true)

expectType<Target>(pick({}, 'prop'))
pick({}, ['prop'])
pick({}, 'prop', { entries: true })
// @ts-expect-error
pick(true, 'prop')
// @ts-expect-error
pick({}, true)
// @ts-expect-error
pick({}, 'prop', true)

expectType<Target>(include({}, 'prop', testValue))
include({}, ['prop'], testValue)
include({}, 'prop', testEntry, { entries: true })
// @ts-expect-error
include(true, 'prop', testEntry)
// @ts-expect-error
include({}, true, testEntry)
// @ts-expect-error
include({}, 'prop', true)
// @ts-expect-error
include({}, 'prop', testEntry, true)

expectType<Target>(exclude({}, 'prop', testValue))
exclude({}, ['prop'], testValue)
exclude({}, 'prop', testEntry, { entries: true })
// @ts-expect-error
exclude(true, 'prop', testEntry)
// @ts-expect-error
exclude({}, true, testEntry)
// @ts-expect-error
exclude({}, 'prop', true)
// @ts-expect-error
exclude({}, 'prop', testEntry, true)

expectType<Target>(merge({}, 'prop', { one: 1 }))
merge({}, ['prop'], { one: 1 })
merge({}, 'prop', true)
// @ts-expect-error
merge(true, 'prop', { one: 1 })
// @ts-expect-error
merge({}, true, { one: 1 })
// @ts-expect-error
merge({}, 'prop', { one: 1 }, true)

expectType<Target>(push({}, 'prop', [1]))
push({}, ['prop'], [1])
push({}, 'prop', [1], { sort: true })
// @ts-expect-error
push(true, 'prop', [1])
// @ts-expect-error
push({}, true, [1])
// @ts-expect-error
push({}, 'prop', true)
// @ts-expect-error
push({}, 'prop', [1], true)

expectType<Target>(unshift({}, 'prop', [1]))
unshift({}, ['prop'], [1])
unshift({}, 'prop', [1], { sort: true })
// @ts-expect-error
unshift(true, 'prop', [1])
// @ts-expect-error
unshift({}, true, [1])
// @ts-expect-error
unshift({}, 'prop', true)
// @ts-expect-error
unshift({}, 'prop', [1], true)

expectType<object>(flatten({}))
expectType<object>(flatten([]))
flatten({}, { shallowArrays: true })
// @ts-expect-error
flatten(true)
// @ts-expect-error
flatten({}, true)
