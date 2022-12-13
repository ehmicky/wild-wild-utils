import { identity } from './helpers/functions.test.js'
import { getChild } from './helpers/inherited.test.js'
import { testMutate } from './helpers/mutate.test.js'
import { testValidation } from './helpers/validate.test.js'

import { map } from 'wild-wild-utils'

const addOne = (value) => value + 1

const removeEmpty = (object) =>
  Object.values(object).every(isEmptyObj) ? {} : object

const isEmptyObj = (object) => Object.keys(object).length === 0

const addOneProp = (object) => ({ ...object, one: 1 })

const addDefaultOne = (value = 1) => value

testMutate('map', map, [
  // Main usage
  { input: [{ one: 1, two: 2 }, '*', identity], output: { one: 1, two: 2 } },
  { input: [{ one: 1, two: 2 }, '*', addOne], output: { one: 2, two: 3 } },
  { input: [{}, 'one', addOne], output: {} },

  // `leaves` and `roots` options
  {
    input: [{ one: { two: {} } }, '*.**', addOneProp],
    output: { one: { one: 1, two: { one: 1 } } },
  },
  {
    input: [{ one: { two: {} } }, '*.**', addOneProp],
    opts: { leaves: true },
    output: { one: { two: { one: 1 } } },
  },
  {
    input: [{ one: { two: { three: {} } } }, '*.**', removeEmpty],
    output: { one: {} },
  },
  {
    input: [{ one: { two: { three: {} } } }, '*.**', removeEmpty],
    opts: { roots: true },
    output: { one: { two: { three: {} } } },
  },

  // `entries` option
  {
    input: [{ one: 1 }, 'one', identity],
    opts: { entries: true },
    output: { one: { value: 1, path: ['one'], missing: false } },
  },
  {
    input: [{}, 'one', identity],
    opts: { entries: true, missing: true },
    output: { one: { value: undefined, path: ['one'], missing: true } },
  },

  // `missing` option
  {
    input: [{ one: 1 }, 'one two', addDefaultOne],
    opts: { missing: true },
    output: { one: 1, two: 1 },
  },

  // `shallowArrays` option
  { input: [[1], '*', addOne], output: [2] },
  { input: [[1], '*', addOne, { shallowArrays: true }], output: [1] },

  // `classes` and `inherited` options
  { input: [getChild(), '/own/', addOne], output: getChild() },
  {
    input: [getChild(), '/own/', addOne],
    opts: { classes: true, mutate: true },
    output: getChild({ own: 'own1' }),
  },
  { input: [getChild(), '/inherited/', addOne], output: getChild() },
  {
    input: [getChild(), '/inherited/', addOne],
    opts: { classes: true, mutate: true },
    output: getChild(),
  },
  {
    input: [getChild(), '/inherited/', addOne],
    opts: { classes: true, inherited: true, mutate: true },
    output: getChild({ inherited: 'inherited1' }),
  },
])

testValidation('map', map, [
  [{}, true, identity],
  [{}, '.', true],
])
