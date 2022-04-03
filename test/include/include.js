import { include } from 'wild-wild-utils'

import {
  returnFalse,
  returnTrue,
  isOne,
  isObject,
  isNotObject,
  isNamedTwo,
} from '../helpers/functions.js'
import { getChild } from '../helpers/inherited.js'
import { testOutput } from '../helpers/output.js'
import { testValidation } from '../helpers/validate.js'

const child = getChild()

testOutput('include', include, [
  // Main usage
  {
    input: [{ one: 1, two: 2 }, 'one two', returnTrue],
    output: { one: 1, two: 2 },
  },
  { input: [{ one: 1, two: 2 }, 'one two', returnFalse], output: {} },
  { input: [{ one: 1, two: 2 }, 'one', returnTrue], output: { one: 1 } },
  { input: [{ one: 1, two: 2 }, 'one two', isOne], output: { one: 1 } },
  { input: [{ one: 1 }, 'two', returnTrue], output: {} },
  { input: [{ one: { two: 2 } }, 'one one.two', returnFalse], output: {} },
  {
    input: [{ one: { two: 2, three: 3 } }, 'one one.two', isObject],
    output: { one: { two: 2, three: 3 } },
  },
  {
    input: [{ one: { two: 2, three: 3 } }, 'one one.two', isNotObject],
    output: { one: { two: 2 } },
  },

  // `entries` option
  {
    input: [{ one: 1, two: 2 }, 'one two', isNamedTwo, { entries: true }],
    output: { two: 2 },
  },

  // `sort` option
  {
    input: [{ two: 2, one: 1 }, 'one two', returnTrue],
    output: { two: 2, one: 1 },
  },
  {
    input: [{ two: 2, one: 1 }, 'one two', returnTrue, { sort: true }],
    output: { one: 1, two: 2 },
  },

  // `classes` and `inherited` options
  { input: [child, '/own/', returnTrue], output: {} },
  {
    input: [child, '/own/', returnTrue, { classes: true }],
    output: { own: 'own' },
  },
  { input: [child, '/inherited/', returnTrue], output: {} },
  { input: [child, '/inherited/', returnTrue, { classes: true }], output: {} },
  {
    input: [
      child,
      '/inherited/',
      returnTrue,
      { classes: true, inherited: true },
    ],
    output: { inherited: 'inherited' },
  },
])

testValidation('include', include, [
  [{}, true, returnTrue],
  [{}, '.', true],
])
