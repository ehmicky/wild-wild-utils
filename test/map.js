import { map } from 'wild-wild-utils'

import { getChild } from './helpers/inherited.js'
import { testOutput } from './helpers/output.js'
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

const returnEntry = function (entry) {
  return entry
}

const addDefaultOne = function (value = 1) {
  return value
}

testOutput('map', map, [
  // Main usage
  { input: [{ one: 1, two: 2 }, '*', addOne], output: { one: 2, two: 3 } },
  { input: [{}, 'one', addOne], output: {} },

  // `leaves` and `roots` options
  { input: [{ one: {} }, '**', addOneProp], output: { one: 1 } },
  {
    input: [{ one: {} }, '**', addOneProp, { leaves: true }],
    output: { one: { one: 1 } },
  },
  { input: [{ one: { two: {} } }, '**', removeEmpty], output: {} },
  {
    input: [{ one: { two: {} } }, '**', removeEmpty, { roots: true }],
    output: { one: { two: {} } },
  },

  // `entries` option
  {
    input: [{ one: 1 }, 'one', returnEntry, { entries: true }],
    output: { one: { value: 1, path: ['one'], missing: false } },
  },
  {
    input: [{}, 'one', returnEntry, { entries: true, missing: true }],
    output: { one: { value: undefined, path: ['one'], missing: true } },
  },

  // `missing` option
  {
    input: [{ one: 1 }, 'one two', addDefaultOne, { missing: true }],
    output: { one: 1, two: 1 },
  },

  // `classes` and `inherited` options
  { input: [getChild(), 'own', addOne], output: getChild() },
  {
    input: [getChild(), 'own', addOne, { classes: true, mutate: true }],
    output: getChild({ own: 'own1' }),
  },
  { input: [getChild(), '/inherited/', addOne], output: getChild() },
  {
    input: [getChild(), '/inherited/', addOne, { classes: true }],
    output: getChild(),
  },
  {
    input: [
      getChild(),
      '/inherited/',
      addOne,
      { classes: true, inherited: true, mutate: true },
    ],
    output: getChild({ inherited: 'inherited1' }),
  },
])

testValidation('map', map, [[{}, true]])
