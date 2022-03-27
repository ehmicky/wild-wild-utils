import { find } from 'wild-wild-utils'

import { getChild } from './helpers/inherited.js'
import { testOutput } from './helpers/output.js'
import { testValidation } from './helpers/validate.js'

const isTwo = function (value) {
  return value === 2
}

const returnTrue = function () {
  return true
}

const child = getChild()

testOutput('find', find, [
  // Main usage
  { input: [{ one: 1, two: 2 }, '*', isTwo], output: 2 },
  { input: [{ one: 1, two: 2 }, '*', returnTrue], output: 1 },
  { input: [{}, 'one', returnTrue], output: undefined },

  // `childFirst`, `leaves` and `roots` options
  { input: [{ one: 1 }, '**', returnTrue], output: { one: 1 } },
  { input: [{ one: 1 }, '**', returnTrue, { childFirst: true }], output: 1 },
  { input: [{ one: 1 }, '**', returnTrue, { leaves: true }], output: 1 },
  {
    input: [{ one: 1 }, '**', returnTrue, { childFirst: true, roots: true }],
    output: { one: 1 },
  },

  // `sort` option
  { input: [{ two: 2, one: 1 }, '*', returnTrue], output: 2 },
  { input: [{ two: 2, one: 1 }, '*', returnTrue, { sort: true }], output: 1 },

  // `entries` option
  {
    input: [{ one: 1 }, '*', returnTrue, { entries: true }],
    output: { value: 1, path: ['one'], missing: false },
  },
  { input: [{}, 'one', returnTrue, { entries: true }], output: undefined },

  // `classes` and `inherited` options
  { input: [child, 'own', returnTrue], output: undefined },
  { input: [child, 'own', returnTrue, { classes: true }], output: 'own' },
  { input: [child, '/inherited/', returnTrue], output: undefined },
  {
    input: [child, '/inherited/', returnTrue, { classes: true }],
    output: undefined,
  },
  {
    input: [
      child,
      '/inherited/',
      returnTrue,
      { classes: true, inherited: true },
    ],
    output: 'inherited',
  },
])

testValidation('find', find, [
  [{}, true, returnTrue],
  [{}, '.', true],
])
