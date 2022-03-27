import type { Target, Query, Entry, Options } from 'wild-wild-path'

type Value = Entry['value']
type MapValue = (value: Value) => Value
type MapEntry = (entry: Entry) => Entry

type OptionsWithEntries = Options & { entries: true }

export function map<T extends Options>(
  target: Target,
  query: Query,
  mapFunction: T extends OptionsWithEntries ? MapEntry : MapValue,
  options?: T,
): Target
