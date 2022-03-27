import { merge } from 'wild-wild-utils'

import { getChild } from '../../helpers/inherited.js'
import { testOutput } from '../../helpers/output.js'

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
