import type { Target, Query, Entry, Options } from 'wild-wild-path'

type Value = Entry['value']
type MapValue = (value: Value) => Value
type MapEntry = (entry: Entry) => Entry
type TestValue = (value: Value) => boolean
type TestEntry = (entry: Entry) => boolean

type OptionsWithEntries = Options & { entries: true }

export function map<T extends Options>(
  target: Target,
  query: Query,
  mapFunction: T extends OptionsWithEntries ? MapEntry : MapValue,
  options?: T,
): Target
export function find<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): T extends OptionsWithEntries ? Entry : Value
export function include<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): Target
