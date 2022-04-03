import type {
  Target,
  Query,
  Entry,
  Options as BaseOptions,
} from 'wild-wild-path'

type Value = Entry['value']
type MapValue = (value: Value) => Value
type MapEntry = (entry: Entry) => Entry
type TestValue = (value: Value) => boolean
type TestEntry = (entry: Entry) => boolean

export type Options = BaseOptions & {
  /**
   * Whether merging should be shallow or deep.
   */
  readonly deep: true
}
type OptionsWithEntries = Options & { entries: true }

/**
 * Use a `mapFunction()` to modify any property matching the `query`.
 *
 * @example
 * ```js
 * const target = { user: { firstName: 'Alice', lastName: 'Smith' } }
 * map(target, 'user.*', (userProp) => userProp.toLowerCase())
 * // { user: { firstName: 'alice', lastName: 'smith' } }
 * ```
 */
export function map<T extends Options>(
  target: Target,
  query: Query,
  mapFunction: T extends OptionsWithEntries ? MapEntry : MapValue,
  options?: T,
): Target

/**
 * Merge an object `value` with each object property matching the `query`.
 * If one of these properties is not an object, it is overridden instead.
 * Merging is shallow unless the `deep` option is `true`.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', settings: { deleted: true } },
 *   userTwo: { firstName: 'John', settings: { deleted: false } },
 * }
 * merge(target, '*', { age: 72, settings: { admin: true } })
 * // {
 * //   userOne: { firstName: 'Alice', age: 72, settings: { admin: true } },
 * //   userTwo: { firstName: 'John', age: 72, settings: { admin: true } },
 * // }
 * merge(target, '*', { age: 72, settings: { admin: true } }, { deep: true })
 * // {
 * //   userOne: {
 * //     firstName: 'Alice',
 * //     age: 72,
 * //     settings: { deleted: true, admin: true },
 * //   },
 * //   userTwo: {
 * //     firstName: 'John',
 * //     age: 72,
 * //     settings: { deleted: false, admin: true },
 * //   },
 * // }
 * ```
 */
export function merge(
  target: Target,
  query: Query,
  value: object,
  options?: Options,
): Target

/**
 * Concatenate an array of `values` with each array property matching the
 * `query`.
 * If one of these properties is not an array, it is overridden instead.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', colors: ['red'] },
 *   userTwo: { firstName: 'John', colors: ['blue'] },
 * }
 * push(target, '*.colors', ['yellow', 'silver'])
 * // {
 * //   userOne: { firstName: 'Alice', colors: ['red', 'yellow', 'silver'] },
 * //   userTwo: { firstName: 'John', colors: ['blue', 'yellow', 'silver'] },
 * // }
 * ```
 */
export function push(
  target: Target,
  query: Query,
  values: readonly any[],
  options?: Options,
): Target

/**
 * Like `push()` but concatenates at the beginning of each property instead of
 * at the end.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', colors: ['red'] },
 *   userTwo: { firstName: 'John', colors: ['blue'] },
 * }
 * unshift(target, '*.colors', ['yellow', 'silver'])
 * // {
 * //   userOne: { firstName: 'Alice', colors: ['yellow', 'silver', 'red'] },
 * //   userTwo: { firstName: 'John', colors: ['yellow', 'silver', 'blue'] },
 * // }
 * ```
 */
export function unshift(
  target: Target,
  query: Query,
  values: readonly any[],
  options?: Options,
): Target

/**
 * Return the first property that matches the `query` and that returns `true`
 * with the `testFunction()`.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', colors: ['red'] },
 *   userTwo: { firstName: 'John', colors: ['blue'] },
 * }
 * find(target, '*.firstName', (firstName) => firstName !== 'John') // 'Alice'
 * ```
 */
export function find<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): T extends OptionsWithEntries ? Entry : Value

/**
 * Keep only the properties matching the `query`.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
 *   userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
 * }
 * pick(target, '*./Name/')
 * // {
 * //   userOne: { firstName: 'Alice', lastName: 'Smith' },
 * //   userTwo: { firstName: 'John', lastName: 'Doe' },
 * // }
 * ```
 */
export function pick(target: Target, query: Query, options?: Options): Target

/**
 * Keep only the properties that match the `query` and that return `true` with
 * the `testFunction()`.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
 *   userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
 * }
 * include(target, '**', (value) => typeof value === 'string')
 * // {
 * //   userOne: { firstName: 'Alice', lastName: 'Smith' },
 * //   userTwo: { firstName: 'John', lastName: 'Doe' },
 * // }
 * ```
 */
export function include<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): Target

/**
 * Remove any property that matches the `query` and that returns `true` with the
 * `testFunction()`.
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
 *   userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
 * }
 * exclude(target, '**', (value) => typeof value === 'string')
 * // {
 * //   userOne: { age: 72, admin: true },
 * //   userTwo: { age: 72, admin: true },
 * // }
 * ```
 */
export function exclude<T extends Options>(
  target: Target,
  query: Query,
  testFunction: T extends OptionsWithEntries ? TestEntry : TestValue,
  options?: T,
): Target
