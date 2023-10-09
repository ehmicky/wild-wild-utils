<img alt="wild-wild-utils logo" src="https://raw.githubusercontent.com/ehmicky/design/main/wild-wild-utils/wild-wild-utils.svg?sanitize=true" width="700"/>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/wild-wild-utils)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/wild-wild-utils?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/wild-wild-utils)
[![Minified size](https://img.shields.io/bundlephobia/minzip/wild-wild-utils?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/wild-wild-utils)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

🤠 Functional utilities using object property paths with wildcards and regexps.
🌵

Available functional methods include:

- 🗺️ Mapping: [`map()`](#maptarget-query-mapfunction-options),
  [`flatten()`](#flattentarget-options)
- 🚂 Merging/concatenating: [`merge()`](#mergetarget-query-value-options),
  [`push()`](#pushtarget-query-values-options),
  [`unshift()`](#unshifttarget-query-values-options)
- ⛏️ Finding: [`find()`](#findtarget-query-testfunction-options)
- ⭐ Filtering: [`pick()`](#picktarget-query-options),
  [`include()`](#includetarget-query-testfunction-options),
  [`exclude()`](#excludetarget-query-testfunction-options)

Unlike similar libraries, object properties can be get/set using
[dot-delimited paths](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-deep-properties),
[wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards),
[regexps](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-regexps),
[slices](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-array-slices) and
[unions](https://github.com/ehmicky/wild-wild-path#-unions). It is built on top
of [`wild-wild-path`](https://github.com/ehmicky/wild-wild-path).

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Install

```bash
npm install wild-wild-utils
```

This package works in both Node.js >=16.17.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## Methods

### map(target, query, mapFunction, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`mapFunction`: `(value) => value`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Use a `mapFunction()` to modify any property matching the `query`.

```js
const target = { user: { firstName: 'Alice', lastName: 'Smith' } }
map(target, 'user.*', (userProp) => userProp.toLowerCase())
// { user: { firstName: 'alice', lastName: 'smith' } }
```

### merge(target, query, value, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`value`: `any`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Deeply merge an object `value` with each object property matching the `query`.

If one of these properties is not an object, it is overridden instead.

[Any object in `value` can change](https://github.com/ehmicky/declarative-merge#nesting)
the merge mode using a `_merge` property with value
[`"deep"`](https://github.com/ehmicky/declarative-merge#deep-merge) (default),
[`"shallow"`](https://github.com/ehmicky/declarative-merge#shallow-merge),
[`"set"`](https://github.com/ehmicky/declarative-merge#no-merge) or
[`"delete"`](https://github.com/ehmicky/declarative-merge#delete).

Arrays
[can be merged using objects in `value`](https://github.com/ehmicky/declarative-merge#arrays)
where the keys are the
[array indices](https://github.com/ehmicky/declarative-merge#update). Items can
be [updated](https://github.com/ehmicky/declarative-merge#update),
[merged](https://github.com/ehmicky/declarative-merge#merge),
[added](https://github.com/ehmicky/declarative-merge#add),
[inserted](https://github.com/ehmicky/declarative-merge#insert),
[appended](https://github.com/ehmicky/declarative-merge#append),
[prepended](https://github.com/ehmicky/declarative-merge#prepend) or
[deleted](https://github.com/ehmicky/declarative-merge#delete-1).

```js
const target = {
  userOne: { names: ['Alice', 'Smith'], settings: { deleted: true } },
  userTwo: { names: ['John', 'Doe'], settings: { deleted: false } },
}

merge(target, '*', { age: 72, settings: { admin: true } })
// {
//   userOne: {
//     names: ['Alice', 'Smith'],
//     settings: { deleted: true, admin: true },
//     age: 72,
//   },
//   userTwo: {
//     names: ['John', 'Doe'],
//     settings: { deleted: false, admin: true },
//     age: 72,
//   },
// }

merge(target, '*', { age: 72, settings: { admin: true }, _merge: 'shallow' })
// {
//   userOne: {
//     names: [ 'Alice', 'Smith' ],
//     settings: { admin: true },
//     age: 72,
//   },
//   userTwo: {
//     names: [ 'John', 'Doe' ],
//     settings: { admin: true },
//     age: 72,
//   },
// }

merge(target, '*', { names: { 1: 'Red' } })
// {
//   userOne: {
//     names: ['Alice', 'Red'],
//     settings: { deleted: true },
//     age: 72,
//   },
//   userTwo: {
//     names: ['John', 'Red'],
//     settings: { deleted: false },
//     age: 72,
//   },
// }
```

### push(target, query, values, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`values`: `any[]`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Concatenate an array of `values` with each array property matching the `query`.

If one of these properties is not an array, it is overridden instead.

```js
const target = {
  userOne: { firstName: 'Alice', colors: ['red'] },
  userTwo: { firstName: 'John', colors: ['blue'] },
}
push(target, '*.colors', ['yellow', 'silver'])
// {
//   userOne: { firstName: 'Alice', colors: ['red', 'yellow', 'silver'] },
//   userTwo: { firstName: 'John', colors: ['blue', 'yellow', 'silver'] },
// }
```

### unshift(target, query, values, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`values`: `any[]`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Like [`push()`](#pushtarget-query-values-options) but concatenates at the
beginning of each property instead of at the end.

```js
const target = {
  userOne: { firstName: 'Alice', colors: ['red'] },
  userTwo: { firstName: 'John', colors: ['blue'] },
}
unshift(target, '*.colors', ['yellow', 'silver'])
// {
//   userOne: { firstName: 'Alice', colors: ['yellow', 'silver', 'red'] },
//   userTwo: { firstName: 'John', colors: ['yellow', 'silver', 'blue'] },
// }
```

### find(target, query, testFunction, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`testFunction`: `(value) => boolean`\
`options`: [`Options?`](#options)\
_Return value_: `any`

Return the first property that matches the `query` and that returns `true` with
the `testFunction()`.

```js
const target = {
  userOne: { firstName: 'Alice', colors: ['red'] },
  userTwo: { firstName: 'John', colors: ['blue'] },
}
find(target, '*.firstName', (firstName) => firstName !== 'John') // 'Alice'
```

### pick(target, query, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Keep only the properties matching the `query`.

```js
const target = {
  userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
  userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
}
pick(target, '*./Name/')
// {
//   userOne: { firstName: 'Alice', lastName: 'Smith' },
//   userTwo: { firstName: 'John', lastName: 'Doe' },
// }
```

### include(target, query, testFunction, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`testFunction`: `(value) => boolean`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Keep only the properties that match the `query` and that return `true` with the
`testFunction()`.

```js
const target = {
  userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
  userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
}
include(target, '**', (value) => typeof value === 'string')
// {
//   userOne: { firstName: 'Alice', lastName: 'Smith' },
//   userTwo: { firstName: 'John', lastName: 'Doe' },
// }
```

### exclude(target, query, testFunction, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`query`: [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`testFunction`: `(value) => boolean`\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Remove any property that matches the `query` and that returns `true` with the
`testFunction()`.

```js
const target = {
  userOne: { firstName: 'Alice', lastName: 'Smith', age: 72, admin: true },
  userTwo: { firstName: 'John', lastName: 'Doe', age: 72, admin: true },
}
exclude(target, '**', (value) => typeof value === 'string')
// {
//   userOne: { age: 72, admin: true },
//   userTwo: { age: 72, admin: true },
// }
```

### flatten(target, options?)

`target`: [`Target`](https://github.com/ehmicky/wild-wild-path#target)\
`options`: [`Options?`](#options)\
_Return value_: [`Target`](https://github.com/ehmicky/wild-wild-path#target)

Flatten deep properties to shallow properties with
[dot-delimited paths](https://github.com/ehmicky/wild-wild-path#paths).

```js
const target = { user: { firstName: 'Bob', colors: ['red', 'blue'] } }
flatten(target)
// { 'user.firstName': 'Bob', 'user.colors.0': 'red', 'user.colors.1': 'blue' }
```

## Target

The target value must be an object or an array.

## Query

The query format is documented
[here](https://github.com/ehmicky/wild-wild-path#queries). Both query
[strings](https://github.com/ehmicky/wild-wild-path#query-strings) and
[arrays](https://github.com/ehmicky/wild-wild-path#query-arrays) can be used.

## Options

Options are optional plain objects. They are almost
[the same as in `wild-wild-path`](https://github.com/ehmicky/wild-wild-path#options).

### mutate

_Methods_: [`map()`](#maptarget-query-mapfunction-options),
[`merge()`](#mergetarget-query-value-options),
[`push()`](#pushtarget-query-values-options),
[`unshift()`](#unshifttarget-query-values-options),
[`exclude()`](#excludetarget-query-testfunction-options)\
_Type_: `boolean`\
_Default_: `false`

By default, the [target](https://github.com/ehmicky/wild-wild-path#target) is
deeply cloned.\
When `true`, it is directly mutated instead, which is faster but has side effects.

```js
const target = { colors: ['red'] }
console.log(push(target, 'colors', ['blue']))
// { colors: ['red', 'blue'] }
console.log(target)
// { colors: ['red'] }
console.log(push(target, 'colors', ['blue'], { mutate: true }))
// { colors: ['red', 'blue'] }
console.log(target)
// { colors: ['red', 'blue'] }
```

### entries

_Methods_: [`map()`](#maptarget-query-mapfunction-options),
[`find()`](#findtarget-query-testfunction-options),
[`include()`](#includetarget-query-testfunction-options),
[`exclude()`](#excludetarget-query-testfunction-options)\
_Type_: `boolean`\
_Default_: `false`

By default, properties' values are:

- Passed as argument to callbacks like `mapFunction()` and `testFunction()`
- Returned by [`find()`](#findtarget-query-testfunction-options)

When `true`, objects with the following shape are used instead:

- `value` `any`: property's value
- `path` [`Path`](https://github.com/ehmicky/wild-wild-path#paths): property's
  full path
- `missing` `boolean`: whether the property is [missing](#missing) from the
  [target](https://github.com/ehmicky/wild-wild-path#target)

```js
const target = { job: '', firstName: 'Alice', lastName: 'Smith' }
find(target, '*', (value) => value !== '') // 'Alice'
find(
  target,
  '*',
  (entry) => entry.value !== '' && entry.path[0] !== 'firstName',
  { entries: true },
)
// { value: 'Smith', path: ['lastName'], missing: false },
```

### missing

_Methods_: [`map()`](#maptarget-query-mapfunction-options),
[`merge()`](#mergetarget-query-value-options),
[`push()`](#pushtarget-query-values-options),
[`unshift()`](#unshifttarget-query-values-options)\
_Type_: `boolean`\
_Default_: `false` with `map()`, `true` with `merge|push|unshift()`

When `false`, properties
[not defined in the target](https://github.com/ehmicky/wild-wild-path#undefined-values)
are ignored.

```js
const target = {}

push(target, 'colors', ['red']) // { colors: ['red'] }
push(target, 'colors', ['red'], { missing: false }) // {}

map(target, 'name', (value = 'defaultName') => value) // {}
map(target, 'name', ({ value = 'defaultName' }) => value, {
  missing: true,
  entries: true,
}) // { name: 'defaultName' }
```

### sort

_Methods_: [`find()`](#findtarget-query-testfunction-options),
[`pick()`](#picktarget-query-options),
[`include()`](#includetarget-query-testfunction-options),\
[`flatten()`](#flattentarget-options)\
_Type_: `boolean`\
_Default_: `false`

When returning sibling object properties, sort them by the lexigographic order
of their names (not values).

```js
const target = { user: { lastName: 'Doe', firstName: 'John', age: 72 } }
flatten(target)
// { 'user.lastName': 'Doe', 'user.firstName': 'John', 'user.age': 72 }
flatten(target, { sort: true })
// { 'user.age': 72, 'user.firstName': 'John', 'user.lastName': 'Doe' }
```

### childFirst

_Methods_: [`find()`](#findtarget-query-testfunction-options)\
_Type_: `boolean`\
_Default_: `false`

When using [unions](https://github.com/ehmicky/wild-wild-path#-unions) or
[deep wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards), a query
might match both a property and some of its children.

This option decides whether the returned properties should be sorted from
children to parents, or the reverse.

```js
const target = { user: { firstName: 'Alice', lastName: '' } }
const isDefined = (value) => value !== ''
find(target, 'user.**', isDefined) // { firstName: 'Alice', lastName: '' }
find(target, 'user.**', isDefined, { childFirst: true }) // 'Alice'
```

### leaves

_Methods_: [`map()`](#maptarget-query-mapfunction-options),
[`merge()`](#mergetarget-query-value-options),
[`push()`](#pushtarget-query-values-options),
[`unshift()`](#unshifttarget-query-values-options),
[`find()`](#findtarget-query-testfunction-options)\
_Type_: `boolean`\
_Default_: `false`

When using [unions](https://github.com/ehmicky/wild-wild-path#-unions) or
[deep wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards), a query
might match both a property and some of its children.

When `true`, only leaves are matched. In other words, a matching property is
ignored if one of its children also matches.

```js
const target = { user: { settings: { firstName: 'Alice', lastName: 'Smith' } } }
merge(target, 'user user.settings', { age: 72 })
// {
//   user: {
//     settings: { firstName: 'Alice', lastName: 'Smith', age: 72 },
//     age: 72,
//   }
// }
merge(target, 'user user.settings', { age: 72 }, { leaves: true })
// {
//   user: {
//     settings: { firstName: 'Alice', lastName: 'Smith', age: 72 },
//   }
// }
```

### roots

_Methods_: [`map()`](#maptarget-query-mapfunction-options),
[`merge()`](#mergetarget-query-value-options),
[`push()`](#pushtarget-query-values-options),
[`unshift()`](#unshifttarget-query-values-options),
[`find()`](#findtarget-query-testfunction-options)\
_Type_: `boolean`\
_Default_: `false`

When using [unions](https://github.com/ehmicky/wild-wild-path#-unions) or
[deep wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards), a query
might match both a property and some of its children.

When `true`, only roots are matched. In other words, a matching property is
ignored if one of its parents also matches.

```js
const target = { user: { settings: { firstName: 'Alice', lastName: 'Smith' } } }
merge(target, 'user user.settings', { age: 72 })
// {
//   user: {
//     settings: { firstName: 'Alice', lastName: 'Smith', age: 72 },
//     age: 72,
//   }
// }
merge(target, 'user user.settings', { age: 72 }, { roots: true })
// {
//   user: {
//     settings: { firstName: 'Alice', lastName: 'Smith' },
//     age: 72,
//   }
// }
```

### shallowArrays

_Methods_: all\
_Type_: `boolean`\
_Default_: `false`

If `true`, [wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards) do
not recurse on arrays. Array items can still be matched by using
[indices](https://github.com/ehmicky/wild-wild-path#-arrays-indices) or
[slices](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-array-slices).

```js
const target = { user: { firstName: 'Bob', colors: ['red', 'blue'] } }
flatten(target)
// { 'user.firstName': 'Bob', 'user.colors.0': 'red', 'user.colors.1': 'blue' }
flatten(target, { shallowArrays: true })
// { 'user.firstName': 'Bob', 'user.colors': ['red', 'blue'] }
```

### classes

_Methods_: all\
_Type_: `boolean`\
_Default_: `false`

Unless `true`, [wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards)
and [regexps](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-regexps)
ignore properties of objects that are not plain objects (like class instances,
errors or functions). Those can still be matched by using their
[property name](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-deep-properties).

```js
const target = { user: new User({ name: 'Alice' }) }
const isDefined = (value) => value !== ''
find(target, 'user.*', isDefined) // undefined
find(target, 'user.*', isDefined, { classes: true }) // 'Alice'
```

### inherited

_Methods_: all\
_Type_: `boolean`\
_Default_: `false`

By default, [wildcards](https://github.com/ehmicky/wild-wild-path#-wildcards)
and [regexps](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-regexps)
ignore properties that are either
[inherited](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
or
[not enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties).
Those can still be matched by using their
[property name](https://github.com/ehmicky/wild-wild-path#%EF%B8%8F-deep-properties).

When `true`, inherited properties are not ignored, but not enumerable ones still
are.

# Related projects

- [`wild-wild-path`](https://github.com/ehmicky/wild-wild-path): object property
  paths used by `wild-wild-utils`
- [`wild-wild-parser`](https://github.com/ehmicky/wild-wild-parser): parser for
  `wild-wild-path`'s object property paths
- [`declarative-merge`](https://github.com/ehmicky/declarative-merge): object
  merging logic used by the [`merge()` method](#mergetarget-query-value-option)
- [`set-array`](https://github.com/ehmicky/set-array): array update logic used
  by the [`merge()` method](#mergetarget-query-value-option)

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/wild-wild-utils/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/wild-wild-utils/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
