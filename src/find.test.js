import { isOne, returnTrue } from './helpers/functions.test.js'
import { getChild } from './helpers/inherited.test.js'
import { testOutput } from './helpers/output.test.js'
import { testValidation } from './helpers/validate.test.js'

import { find } from 'wild-wild-utils'

const child = getChild()

testOutput('find', find, [
  // Main usage
  { input: [{ two: 2, one: 1 }, '*', isOne], output: 1 },
  { input: [{ two: 2, one: 1 }, '*', returnTrue], output: 2 },
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

  // `shallowArrays` option
  { input: [[1], '*', returnTrue], output: 1 },
  { input: [[1], '*', returnTrue, { shallowArrays: true }], output: undefined },

  // `classes` and `inherited` options
  { input: [child, '/own/', returnTrue], output: undefined },
  { input: [child, '/own/', returnTrue, { classes: true }], output: 'own' },
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
