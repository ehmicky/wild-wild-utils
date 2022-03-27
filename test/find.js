import test from 'ava'
import { each } from 'test-each'
import { find } from 'wild-wild-utils'

const isTwo = function (value) {
  return value === 2
}

each(
  [{ input: [{ one: 1, two: 2 }, '*', isTwo], output: 2 }],
  ({ title }, { input, output }) => {
    test(`find() output | ${title}`, (t) => {
      t.deepEqual(find(...input), output)
    })
  },
)
