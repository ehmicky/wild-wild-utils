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
