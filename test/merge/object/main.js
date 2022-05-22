import { merge } from 'wild-wild-utils'

import { testMutate } from '../../helpers/mutate.js'
import { testValidation } from '../../helpers/validate.js'

testMutate('merge', merge, [
  // Merge logic
  { input: [{ one: { two: 2 } }, 'one', 3], output: { one: 3 } },
  { input: [{ one: 3 }, 'one', { two: 2 }], output: { one: { two: 2 } } },
  {
    input: [{ one: { two: 2 } }, 'one', { three: 3 }],
    output: { one: { two: 2, three: 3 } },
  },
  {
    input: [{ one: { two: 2 } }, 'one', { two: 3 }],
    output: { one: { two: 3 } },
  },
  {
    input: [{ one: 2 }, 'one', { two: 3 }],
    output: { one: { two: 3 } },
  },
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
      { one: { two: { three: 3 } } },
      'one',
      { two: { four: 0 }, _merge: 'shallow' },
    ],
    output: { one: { two: { four: 0 } } },
  },
  {
    input: [
      { one: { two: { three: 3 } } },
      'one',
      { two: { four: 0, _merge: 'delete' } },
    ],
    output: { one: {} },
  },
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
])

testValidation('merge', merge, [
  [{}, true, 1],
  [{}, '.', 1, { classes: true }],
])
