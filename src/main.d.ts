import type { Target, Query, Entry, Options } from 'wild-wild-path'

type Value = Entry['value']
type MapValue = (value: Value) => Value
type MapEntry = (entry: Entry) => Entry
type TestValue = (value: Value) => boolean
type TestEntry = (entry: Entry) => boolean

type OptionsWithEntries = Options & { entries: true }
export type MergeOptions = Options & { readonly deep: true }

export function map<T extends Options>(
  target: Target,
  query: Query,
  mapFunction: T extends OptionsWithEntries ? MapEntry : MapValue,
  options?: T,
): Target
export function merge(
  target: Target,
  query: Query,
  value: object,
  options?: MergeOptions,
): Target
export function push(
  target: Target,
  query: Query,
  values: ReadonlyArray<any>,
  options?: Options,
): Target
export function unshift(
  target: Target,
  query: Query,
  values: ReadonlyArray<any>,
  options?: Options,
): Target
export function find<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): T extends OptionsWithEntries ? Entry : Value
export function pick(target: Target, query: Query, options?: Options): Target
export function include<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): Target
export function exclude<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): Target
