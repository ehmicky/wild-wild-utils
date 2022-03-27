import { push, unshift } from 'wild-wild-utils'

import { getChild } from '../helpers/inherited.js'
import { testMutate } from '../helpers/mutate.js'
import { testOutput } from '../helpers/output.js'
import { testValidation } from '../helpers/validate.js'

testMutate('unshift', unshift, [
  { input: [{ one: [1] }, 'one', [2]], output: { one: [2, 1] } },
  { input: [{ one: 1 }, 'one', [2]], output: { one: [2] } },
])

testMutate('push', push, [
  // Main usage
  { input: [{ one: [1] }, 'one', [2]], output: { one: [1, 2] } },
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
])

testOutput('push', push, [
  // `classes` option
  {
    input: [getChild({ own: [1] }), 'own', [2], { mutate: true }],
    output: { own: [2] },
  },
  {
    input: [
      getChild({ own: [1] }),
      'own',
      [2],
      { classes: true, mutate: true },
    ],
    output: getChild({ own: [1, 2] }),
  },
])

testValidation('push', push, [[{}, true, 1]])
