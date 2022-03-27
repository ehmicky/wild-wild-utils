import { pick } from 'wild-wild-utils'

import { getChild } from './helpers/inherited.js'
import { testOutput } from './helpers/output.js'
import { testValidation } from './helpers/validate.js'

const child = getChild()

testOutput('pick', pick, [
  // Main usage
  { input: [{ one: 1, two: 2 }, 'one two'], output: { one: 1, two: 2 } },
  { input: [{ one: 1, two: 2 }, 'one'], output: { one: 1 } },
  { input: [{ one: 1 }, 'two'], output: {} },
  { input: [{ one: { two: 2 } }, 'one one.two'], output: { one: { two: 2 } } },
  {
    input: [{ one: { two: 2, three: 3 } }, 'one one.two'],
    output: { one: { two: 2, three: 3 } },
  },

  // `sort` option
  { input: [{ two: 2, one: 1 }, 'one two'], output: { two: 2, one: 1 } },
  {
    input: [{ two: 2, one: 1 }, 'one two', { sort: true }],
    output: { one: 1, two: 2 },
  },

  // `classes` and `inherited` options
  { input: [child, 'own'], output: {} },
  { input: [child, 'own', { classes: true }], output: { own: 'own' } },
  { input: [child, '/inherited/'], output: {} },
  { input: [child, '/inherited/', { classes: true }], output: {} },
  {
    input: [child, '/inherited/', { classes: true, inherited: true }],
    output: { inherited: 'inherited' },
  },
])

testValidation('pick', pick, [[{}, true]])
