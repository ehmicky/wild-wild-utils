import { map, find, include, exclude } from 'wild-wild-utils'
import type { Target, Entry } from 'wild-wild-path'
import { expectType, expectNotType, expectError } from 'tsd'

const mapValue = (value: any): any => value
const mapEntry = (entry: Entry): Entry => entry
const testValue = (value: any): boolean => true
const testEntry = (entry: Entry): boolean => true

expectType<Target>(map({}, 'prop', mapValue))
map({}, 'prop', mapEntry, { entries: true })
expectError(map(true, 'prop', mapEntry))
expectError(map({}, true, mapEntry))
expectError(map({}, 'prop', true))
expectError(map({}, 'prop', mapEntry, true))

expectType<any>(find({}, 'prop', testValue))
expectType<Entry>(find({}, 'prop', testEntry, { entries: true }))
expectNotType<Entry>(find({}, 'prop', testEntry, { entries: false }))
expectError(find(true, 'prop', testEntry))
expectError(find({}, true, testEntry))
expectError(find({}, 'prop', true))
expectError(find({}, 'prop', testEntry, true))

expectType<Target>(include({}, 'prop', testValue))
include({}, 'prop', testEntry, { entries: true })
expectError(include(true, 'prop', testEntry))
expectError(include({}, true, testEntry))
expectError(include({}, 'prop', true))
expectError(include({}, 'prop', testEntry, true))

expectType<Target>(exclude({}, 'prop', testValue))
exclude({}, 'prop', testEntry, { entries: true })
expectError(exclude(true, 'prop', testEntry))
expectError(exclude({}, true, testEntry))
expectError(exclude({}, 'prop', true))
expectError(exclude({}, 'prop', testEntry, true))
