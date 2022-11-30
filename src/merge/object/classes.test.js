import { merge } from 'wild-wild-utils'

import { getChild } from '../../helpers/inherited.test.js'
import { testOutput } from '../../helpers/output.test.js'

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
