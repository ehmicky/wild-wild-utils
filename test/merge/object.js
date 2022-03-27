import { merge } from 'wild-wild-utils'

import { getChild } from '../helpers/inherited.js'
import { testMutate } from '../helpers/mutate.js'
import { testOutput } from '../helpers/output.js'
import { testValidation } from '../helpers/validate.js'

testMutate('merge', merge, [
  // Shallow and deep merge
  ...[true, false].flatMap((deep) => [
    {
      input: [{ one: { two: 2 } }, 'one', { three: 3 }],
      opts: { deep },
      output: { one: { two: 2, three: 3 } },
    },
    {
      input: [{ one: { two: 2 } }, 'one', { two: 3 }],
      opts: { deep },
      output: { one: { two: 3 } },
    },
    {
      input: [{ one: { two: 2 } }, 'three', { two: 2 }],
      opts: { deep },
      output: { one: { two: 2 }, three: { two: 2 } },
    },
    {
      input: [{ one: { two: 2 } }, 'three', { two: 2 }],
      opts: { deep, missing: false },
      output: { one: { two: 2 } },
    },
    {
      input: [{ one: 2 }, 'one', { two: 3 }],
      opts: { deep },
      output: { one: { two: 3 } },
    },
  ]),
  {
    input: [{ one: { two: { three: 3 } } }, 'one', { two: { four: 0 } }],
    output: { one: { two: { four: 0 } } },
  },
  {
    input: [{ one: { two: { three: 3 } } }, 'one', { two: { four: 0 } }],
    opts: { deep: true },
    output: { one: { two: { three: 3, four: 0 } } },
  },
  {
    input: [{ one: { two: [{}] } }, 'one', { two: [{ three: 1 }] }],
    output: { one: { two: [{ three: 1 }] } },
  },
  {
    opts: { deep: true },
    output: { one: { two: [{}, { three: 1 }] } },
    input: [{ one: { two: [{}] } }, 'one', { two: [{ three: 1 }] }],
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

testOutput('merge', merge, [
  // `classes` option
  {
    input: [getChild({ own: { one: 1 } }), 'own', { two: 2 }, { mutate: true }],
    output: { own: { two: 2 } },
  },
  ...[true, false].flatMap((deep) => [
    {
      input: [
        getChild({ own: { one: 1 } }),
        'own',
        { two: 2 },
        { classes: true, mutate: true, deep },
      ],
      output: getChild({ own: { one: 1, two: 2 } }),
    },
  ]),
  ...[
    { classes: false, output: { one: { two: getChild({ own: { six: 0 } }) } } },
    { classes: true, output: { one: { two: { own: { three: 3, six: 0 } } } } },
  ].map(({ classes, output }) => ({
    input: [
      { one: { two: { own: { three: 3 } } } },
      'one',
      { two: getChild({ own: { six: 0 } }) },
      { classes, mutate: true, deep: true },
    ],
    output,
  })),
])

testValidation('merge', merge, [
  [{}, true, { one: 1 }],
  [{}, '.', 1],
  [{}, '.', 1, { classes: true }],
])
