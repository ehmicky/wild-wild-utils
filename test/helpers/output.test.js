// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import { each } from 'test-each'

// Test the output of a specific method based on its input
export const testOutput = function (name, method, inputs) {
  each(inputs, ({ title }, { input, output }) =>
    testOutputSingle({ name, method, title, input, output }),
  )
}

const testOutputSingle = function ({ title, name, method, input, output }) {
  test(`${name}() output | ${title}`, (t) => {
    t.deepEqual(method(...input), output)
  })
}
