import { merge } from 'wild-wild-utils'

import { getChild } from '../helpers/inherited.test.js'
import { testMutate } from '../helpers/mutate.test.js'
import { testOutput } from '../helpers/output.test.js'
import { testValidation } from '../helpers/validate.test.js'

testMutate('merge', merge, [
  // Setting values
  { input: [{ one: { two: 2 } }, 'one', 3], output: { one: 3 } },
  { input: [{ one: 3 }, 'one', { two: 2 }], output: { one: { two: 2 } } },

  // Merging values
  {
    input: [{ one: { two: 2 } }, 'one', { three: 3 }],
    output: { one: { two: 2, three: 3 } },
  },

  // Overriding values
  {
    input: [{ one: { two: 2 } }, 'one', { two: 3 }],
    output: { one: { two: 3 } },
  },
  {
    input: [{ one: 2 }, 'one', { two: 3 }],
    output: { one: { two: 3 } },
  },

  // Merge modes
  {
    input: [{ one: { two: { three: 3 } } }, 'one', { two: { four: 0 } }],
    output: { one: { two: { three: 3, four: 0 } } },
  },
  {
    input: [
      { one: { two: { three: 3 } } },
      'one',
      { two: { four: 0, _merge: 'set' } },
    ],
    output: { one: { two: { four: 0 } } },
  },
  {
    input: [
      { one: { two: { three: 2 } } },
      'one',
      { two: { four: 1 }, _merge: 'shallow' },
    ],
    output: { one: { two: { four: 1 } } },
  },
  {
    input: [
      { one: { two: { three: 1 } } },
      'one',
      { two: { four: 0, _merge: 'delete' } },
    ],
    output: { one: {} },
  },

  // Array merge
  {
    input: [{ one: { two: [{}] } }, 'one', { two: { 0: { three: 1 } } }],
    output: { one: { two: [{ three: 1 }] } },
  },

  // `missing` option
  {
    input: [{ one: { two: 2 } }, 'three', { two: 2 }],
    output: { one: { two: 2 }, three: { two: 2 } },
  },
  {
    input: [{ one: { two: 2 } }, 'three', { two: 2 }],
    opts: { missing: false },
    output: { one: { two: 2 } },
  },

  // `leaves` and `roots` options
  {
    input: [{ one: { two: { three: 3 } } }, 'one one.two', { four: 0 }],
    output: { one: { two: { three: 3, four: 0 }, four: 0 } },
  },
  {
    output: { one: { two: { three: 3, four: 0 } } },
    input: [{ one: { two: { three: 3 } } }, 'one one.two', { four: 0 }],
    opts: { leaves: true },
  },
  {
    input: [{ one: { two: { three: 3 } } }, 'one one.two', { four: 0 }],
    opts: { roots: true },
    output: { one: { two: { three: 3 }, four: 0 } },
  },

  // `shallowArrays` option
  { input: [[{ one: 1 }], '*', { two: 2 }], output: [{ one: 1, two: 2 }] },
  {
    input: [[{ one: 1 }], '*', { two: 2 }, { shallowArrays: true }],
    output: [{ one: 1 }],
  },
])

testValidation('merge', merge, [
  [{}, true, 1],
  [{}, '.', 1, { classes: true }],
])

testOutput('merge', merge, [
  {
    input: [
      getChild({ own: { one: 1 } }),
      '/own/',
      { two: 2 },
      { mutate: true },
    ],
    output: getChild({ own: { one: 1 } }),
  },
  {
    input: [
      getChild({ own: { one: 1 } }),
      '/own/',
      { two: 2 },
      { classes: true, mutate: true },
    ],
    output: getChild({ own: { one: 1, two: 2 } }),
  },
  ...[false, true].map((classes) => ({
    input: [
      { one: { two: { own: { three: 3 } } } },
      '/one/',
      { two: getChild({ own: { six: 0 } }) },
      { classes, mutate: true },
    ],
    output: { one: { two: getChild({ own: { six: 0 } }) } },
  })),
])
