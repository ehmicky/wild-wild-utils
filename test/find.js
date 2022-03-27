import test from 'ava'
import { each } from 'test-each'
import { find } from 'wild-wild-utils'

const isTwo = function (value) {
  return value === 2
}

const returnTrue = function () {
  return true
}

each(
  [
    { input: [{ one: 1, two: 2 }, '*', isTwo], output: 2 },
    { input: [{ one: 1, two: 2 }, '*', returnTrue], output: 1 },
    { input: [{}, '*', returnTrue], output: undefined },

    // `childFirst`, `leaves` and `roots` options
    { input: [{ one: 1 }, '**', returnTrue], output: { one: 1 } },
    { input: [{ one: 1 }, '**', returnTrue, { childFirst: true }], output: 1 },
    { input: [{ one: 1 }, '**', returnTrue, { leaves: true }], output: 1 },
    {
      input: [{ one: 1 }, '**', returnTrue, { childFirst: true, roots: true }],
      output: { one: 1 },
    },

    // `sort` option
    { input: [{ two: 2, one: 1 }, '*', returnTrue], output: 2 },
    { input: [{ two: 2, one: 1 }, '*', returnTrue, { sort: true }], output: 1 },

    // `entries` option
    {
      input: [{ one: 1 }, '*', returnTrue, { entries: true }],
      output: { value: 1, path: ['one'], missing: false },
    },
    { input: [{}, '*', returnTrue, { entries: true }], output: undefined },
  ],
  ({ title }, { input, output }) => {
    test(`find() output | ${title}`, (t) => {
      t.deepEqual(find(...input), output)
    })
  },
)
