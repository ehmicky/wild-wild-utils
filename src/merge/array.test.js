import { getChild } from '../helpers/inherited.test.js'
import { testMutate } from '../helpers/mutate.test.js'
import { testOutput } from '../helpers/output.test.js'
import { testValidation } from '../helpers/validate.test.js'

import { push, unshift } from 'wild-wild-utils'

testMutate('unshift', unshift, [
  { input: [{ one: [1] }, 'one', [2]], output: { one: [2, 1] } },
  { input: [{ one: [1] }, 'one', [2, 3]], output: { one: [2, 3, 1] } },
  { input: [{ one: 1 }, 'one', [2]], output: { one: [2] } },
])

testMutate('push', push, [
  // Main usage
  { input: [{ one: [1] }, 'one', [2]], output: { one: [1, 2] } },
  { input: [{ one: [1] }, 'one', [2, 3]], output: { one: [1, 2, 3] } },
  { input: [{ one: 1 }, 'one', [2]], output: { one: [2] } },

  // `leaves` and `roots` options
  { input: [{ one: [[1]] }, 'one one.0', [2]], output: { one: [[1, 2], 2] } },
  {
    input: [{ one: [[1]] }, 'one one.0', [2]],
    opts: { leaves: true },
    output: { one: [[1, 2]] },
  },
  {
    input: [{ one: [[1]] }, 'one one.0', [2]],
    opts: { roots: true },
    output: { one: [[1], 2] },
  },

  // `missing` option
  { input: [{ one: [1] }, 'two', [2]], output: { one: [1], two: [2] } },
  {
    input: [{ one: [1] }, 'two', [2]],
    opts: { missing: false },
    output: { one: [1] },
  },

  // `shallowArrays` option
  { input: [[[1]], '*', [2]], output: [[1, 2]] },
  { input: [[[1]], '*', [2], { shallowArrays: true }], output: [[1]] },
])

testOutput('push', push, [
  // `classes` option
  {
    input: [getChild({ own: [1] }), '/own/', [2], { mutate: true }],
    output: getChild({ own: [1] }),
  },
  {
    input: [
      getChild({ own: [1] }),
      '/own/',
      [2],
      { classes: true, mutate: true },
    ],
    output: getChild({ own: [1, 2] }),
  },
])

const invalidArguments = [
  [{}, true, [1]],
  [{}, '.', 1],
]

testValidation('push', push, invalidArguments)
testValidation('unshift', unshift, invalidArguments)
