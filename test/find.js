import test from 'ava'
import { each } from 'test-each'
import { find } from 'wild-wild-utils'

const isTwo = function (value) {
  return value === 2
}

const isDefined = function (value) {
  return value !== undefined
}

each(
  [
    { input: [{ one: 1, two: 2 }, '*', isTwo], output: 2 },
    { input: [{ one: 1, two: 2 }, '*', isDefined], output: 1 },
  ],
  ({ title }, { input, output }) => {
    test(`find() output | ${title}`, (t) => {
      t.deepEqual(find(...input), output)
    })
  },
)
