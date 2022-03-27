import { map } from 'wild-wild-utils'
import type { Target, Entry } from 'wild-wild-path'
import { expectType, expectError } from 'tsd'

const mapValue = (value: any): any => value
const mapEntry = (entry: Entry): Entry => entry
expectType<Target>(map({}, 'prop', mapValue))
map({}, 'prop', mapEntry, { entries: true })
expectError(map(true, 'prop', mapEntry))
expectError(map({}, true, mapEntry))
expectError(map({}, 'prop', true))
expectError(map({}, 'prop', mapEntry, true))
