# 4.8.0

## Features

- Improve tree-shaking support

# 4.7.0

## Features

- Add browser support

# 4.6.0

## Features

- Add support for [`sort` option](README.md#sort) with
  [`flatten()` method](README.md#flattentarget-options)

# 4.5.0

## Features

- Add [`flatten()` method](README.md#flattentarget-options) which flattens deep
  properties to shallow properties with dot-delimited paths

# 4.4.0

## Features

- Add [`shallowArrays` option](README.md#shallowarrays) which prevents recursing
  on arrays

# 4.3.0

## Features

- Reduce npm package size by 56%, from 432kB to 192kB

# 4.2.0

## Features

- Reduce npm package size by 67%, from ~1290kB to ~432kB

# 4.1.0

## Features

- Reduce npm package size

# 4.0.0

## Breaking changes

- The [`merge()`](#mergetarget-query-value-options) method has been improved:
  - Merging is now deep by default
  - Merging mode can be changed to
    [`"shallow"`](https://github.com/ehmicky/declarative-merge#shallow-merge),
    [`"set"`](https://github.com/ehmicky/declarative-merge#no-merge) or
    [`"delete"`](https://github.com/ehmicky/declarative-merge#delete) using a
    [`_merge` property](https://github.com/ehmicky/declarative-merge#nesting)
  - Arrays
    [can now be merged using objects](https://github.com/ehmicky/declarative-merge#arrays)
    where the keys are the
    [array indices](https://github.com/ehmicky/declarative-merge#update). Items
    can be [updated](https://github.com/ehmicky/declarative-merge#update),
    [merged](https://github.com/ehmicky/declarative-merge#merge),
    [added](https://github.com/ehmicky/declarative-merge#add),
    [inserted](https://github.com/ehmicky/declarative-merge#insert),
    [appended](https://github.com/ehmicky/declarative-merge#append),
    [prepended](https://github.com/ehmicky/declarative-merge#prepend) or
    [deleted](https://github.com/ehmicky/declarative-merge#delete-1).
  - The merged value can now be of any type
  - TypeScript types have been updated accordingly

# 3.0.0

## Breaking changes

- Minimal supported Node.js version is now `14.18.0`
