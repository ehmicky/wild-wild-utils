import {
  map,
  find,
  pick,
  include,
  exclude,
  merge,
  push,
  unshift,
  MergeOptions,
} from 'wild-wild-utils'
import type { Target, Entry } from 'wild-wild-path'
import { expectType, expectNotType, expectError } from 'tsd'

const mergeOptions: MergeOptions = { deep: true, sort: false }

const mapValue = (value: any): any => value
const mapEntry = (entry: Entry): Entry => entry
const testValue = (value: any): boolean => true
const testEntry = (entry: Entry): boolean => true

expectType<Target>(map({}, 'prop', mapValue))
map({}, ['prop'], mapEntry)
map({}, 'prop', mapEntry, { entries: true })
expectError(map(true, 'prop', mapEntry))
expectError(map({}, true, mapEntry))
expectError(map({}, 'prop', true))
expectError(map({}, 'prop', mapEntry, true))

expectType<any>(find({}, 'prop', testValue))
expectType<Entry>(find({}, 'prop', testEntry, { entries: true }))
expectNotType<Entry>(find({}, 'prop', testEntry, { entries: false }))
find({}, ['prop'], testValue)
expectError(find(true, 'prop', testEntry))
expectError(find({}, true, testEntry))
expectError(find({}, 'prop', true))
expectError(find({}, 'prop', testEntry, true))

expectType<Target>(pick({}, 'prop'))
pick({}, ['prop'])
pick({}, 'prop', { entries: true })
expectError(pick(true, 'prop'))
expectError(pick({}, true))
expectError(pick({}, 'prop', true))

expectType<Target>(include({}, 'prop', testValue))
include({}, ['prop'], testValue)
include({}, 'prop', testEntry, { entries: true })
expectError(include(true, 'prop', testEntry))
expectError(include({}, true, testEntry))
expectError(include({}, 'prop', true))
expectError(include({}, 'prop', testEntry, true))

expectType<Target>(exclude({}, 'prop', testValue))
exclude({}, ['prop'], testValue)
exclude({}, 'prop', testEntry, { entries: true })
expectError(exclude(true, 'prop', testEntry))
expectError(exclude({}, true, testEntry))
expectError(exclude({}, 'prop', true))
expectError(exclude({}, 'prop', testEntry, true))

expectType<Target>(merge({}, 'prop', { one: 1 }))
merge({}, ['prop'], { one: 1 })
merge({}, 'prop', { one: 1 }, { deep: true })
expectError(merge(true, 'prop', { one: 1 }))
expectError(merge({}, true, { one: 1 }))
expectError(merge({}, 'prop', true))
expectError(merge({}, 'prop', { one: 1 }, true))

expectType<Target>(push({}, 'prop', [1]))
push({}, ['prop'], [1])
push({}, 'prop', [1], { sort: true })
expectError(push(true, 'prop', [1]))
expectError(push({}, true, [1]))
expectError(push({}, 'prop', true))
expectError(push({}, 'prop', [1], true))

expectType<Target>(unshift({}, 'prop', [1]))
unshift({}, ['prop'], [1])
unshift({}, 'prop', [1], { sort: true })
expectError(unshift(true, 'prop', [1]))
expectError(unshift({}, true, [1]))
expectError(unshift({}, 'prop', true))
expectError(unshift({}, 'prop', [1], true))
