import { map } from 'wild-wild-utils'

import { getChild } from './helpers/inherited.js'
import { testMutate } from './helpers/mutate.js'
import { testValidation } from './helpers/validate.js'

const addOne = function (value) {
  return value + 1
}

const removeEmpty = function (object) {
  return Object.values(object).every(isEmptyObj) ? {} : object
}

const isEmptyObj = function (object) {
  return Object.keys(object).length === 0
}

const addOneProp = function (object) {
  return { ...object, one: 1 }
}

const identity = function (value) {
  return value
}

const addDefaultOne = function (value = 1) {
  return value
}

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

  // `classes` and `inherited` options
  { input: [getChild(), 'own', addOne], output: getChild() },
  {
    input: [getChild(), 'own', addOne],
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
