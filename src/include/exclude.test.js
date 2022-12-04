import {
  returnFalse,
  returnTrue,
  isOne,
  isNotOne,
  isNamedTwo,
} from '../helpers/functions.test.js'
import { getChild } from '../helpers/inherited.test.js'
import { testMutate } from '../helpers/mutate.test.js'
import { testValidation } from '../helpers/validate.test.js'

import { exclude } from 'wild-wild-utils'

testMutate('exclude', exclude, [
  // Main usage
  {
    input: [{ one: 1, two: 2 }, 'one', returnFalse],
    output: { one: 1, two: 2 },
  },
  { input: [{ one: 1, two: 2 }, 'one', returnTrue], output: { two: 2 } },
  { input: [{ two: 2 }, 'one', returnFalse], output: { two: 2 } },
  { input: [{ one: { two: 2 } }, 'one one.two', returnTrue], output: {} },
  { input: [{ one: { two: 1 } }, 'one one.two', isOne], output: { one: {} } },
  { input: [{ one: { two: 1 } }, 'one one.two', isNotOne], output: {} },

  // `entries` option
  {
    input: [{ one: 1, two: 2 }, 'one two', isNamedTwo],
    opts: { entries: true },
    output: { one: 1 },
  },

  // `shallowArrays` option
  { input: [{ one: [1] }, 'one.*', returnTrue], output: { one: [] } },
  {
    input: [{ one: [1] }, 'one.*', returnTrue, { shallowArrays: true }],
    output: { one: [1] },
  },

  // `classes` and `inherited` options
  { input: [getChild(), '/own/', returnTrue], output: getChild() },
  {
    input: [getChild(), '/own/', returnTrue],
    opts: { classes: true, mutate: true },
    output: getChild({ own: undefined }),
  },
  { input: [getChild(), '/inherited/', returnTrue], output: getChild() },
  {
    input: [getChild(), '/inherited/', returnTrue],
    opts: { classes: true, mutate: true },
    output: getChild(),
  },
  {
    input: [getChild(), '/inherited/', returnTrue],
    opts: { classes: true, inherited: true, mutate: true },
    output: getChild({ inherited: undefined }),
  },
])

testValidation('exclude', exclude, [
  [{}, true, returnFalse],
  [{}, '.', true],
])
