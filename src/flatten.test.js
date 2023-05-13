import { getChild } from './helpers/inherited.test.js'
import { testOutput } from './helpers/output.test.js'

import { flatten } from 'wild-wild-utils'

testOutput('flatten', flatten, [
  // Main usage
  {
    input: [{ one: { two: 2 }, three: 3 }],
    output: { 'one.two': 2, three: 3 },
  },
  { input: [[1, { one: 1 }]], output: { 0: 1, '1.one': 1 } },

  // `shallowArrays` option
  {
    input: [{ one: { two: [{ three: 3 }] } }],
    output: { 'one.two.0.three': 3 },
  },
  {
    input: [{ one: { two: [{ three: 3 }] } }, { shallowArrays: true }],
    output: { 'one.two': [{ three: 3 }] },
  },

  // `classes` and `inherited` options
  { input: [getChild({ own: 1 })], output: { '.': getChild({ own: 1 }) } },
  { input: [getChild({ own: 1 }), { classes: true }], output: { own: 1 } },
  {
    input: [getChild({ own: 1 }), { classes: true, inherited: true }],
    output: { inherited: 'inherited', own: 1 },
  },
])
