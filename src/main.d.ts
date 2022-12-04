import type { Target, Query, Entry, Options } from 'wild-wild-path'

type Value = Entry['value']

type MapValue = (value: never) => Value

type MapEntry = (entry: Entry) => Entry

type TestValue = (value: never) => boolean

type TestEntry = (entry: Entry) => boolean

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
 * Deeply merge an object `value` with each object property matching the `query`.
 *
 * If one of these properties is not an object, it is overridden instead.
 *
 * [Any object in `value` can change](https://github.com/ehmicky/declarative-merge#nesting)
 * the merge mode using a `_merge` property with value
 * [`"deep"`](https://github.com/ehmicky/declarative-merge#deep-merge) (default),
 * [`"shallow"`](https://github.com/ehmicky/declarative-merge#shallow-merge),
 * [`"set"`](https://github.com/ehmicky/declarative-merge#no-merge) or
 * [`"delete"`](https://github.com/ehmicky/declarative-merge#delete).
 *
 * Arrays
 * [can be merged using objects in `value`](https://github.com/ehmicky/declarative-merge#arrays)
 * where the keys are the
 * [array indices](https://github.com/ehmicky/declarative-merge#update). Items can
 * be [updated](https://github.com/ehmicky/declarative-merge#update),
 * [merged](https://github.com/ehmicky/declarative-merge#merge),
 * [added](https://github.com/ehmicky/declarative-merge#add),
 * [inserted](https://github.com/ehmicky/declarative-merge#insert),
 * [appended](https://github.com/ehmicky/declarative-merge#append),
 * [prepended](https://github.com/ehmicky/declarative-merge#prepend) or
 * [deleted](https://github.com/ehmicky/declarative-merge#delete-1).
 *
 * @example
 * ```js
 * const target = {
 *   userOne: { names: ['Alice', 'Smith'], settings: { deleted: true } },
 *   userTwo: { names: ['John', 'Doe'], settings: { deleted: false } },
 * }
 *
 * merge(target, '*', { age: 72, settings: { admin: true } })
 * // {
 * //   userOne: {
 * //     names: ['Alice', 'Smith'],
 * //     settings: { deleted: true, admin: true },
 * //     age: 72,
 * //   },
 * //   userTwo: {
 * //     names: ['John', 'Doe'],
 * //     settings: { deleted: false, admin: true },
 * //     age: 72,
 * //   },
 * // }
 *
 * merge(target, '*', { age: 72, settings: { admin: true }, _merge: 'shallow' })
 * // {
 * //   userOne: {
 * //     names: [ 'Alice', 'Smith' ],
 * //     settings: { admin: true },
 * //     age: 72,
 * //   },
 * //   userTwo: {
 * //     names: [ 'John', 'Doe' ],
 * //     settings: { admin: true },
 * //     age: 72,
 * //   },
 * // }
 *
 * merge(target, '*', { names: { 1: 'Red' } })
 * // {
 * //   userOne: {
 * //     names: ['Alice', 'Red'],
 * //     settings: { deleted: true, admin: true },
 * //     age: 72,
 * //   },
 * //   userTwo: {
 * //     names: ['John', 'Red'],
 * //     settings: { deleted: false, admin: true },
 * //     age: 72,
 * //   },
 * // }
 * ```
 */
export function merge(
  target: Target,
  query: Query,
  value: unknown,
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
  values: readonly unknown[],
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
  values: readonly unknown[],
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

/**
 * Flatten deep properties to shallow properties with
 * [dot-delimited paths](https://github.com/ehmicky/wild-wild-path#paths).
 *
 * @example
 * ```js
 * const target = { user: { firstName: 'Bob', colors: ['red', 'blue'] } }
 * flatten(target)
 * // { 'user.firstName': 'Bob', 'user.colors.0': 'red', 'user.colors.1': 'blue' }
 * ```
 */
export function flatten(target: Target, options?: Options): object
