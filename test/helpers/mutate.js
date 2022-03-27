// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import { each } from 'test-each'

// Test multiple inputs with the `mutate` option either `true` or `false`
export const testMutate = function (name, method, inputs) {
  each([false, true], inputs, ({ title }, mutate, { input, opts, output }) =>
    testMutateSingle({ title, name, method, mutate, input, opts, output }),
  )
}

const testMutateSingle = function ({
  title,
  name,
  method,
  mutate,
  input,
  input: [target],
  opts = {},
  output,
}) {
  if (opts.mutate && !mutate) {
    return
  }

  test(`${name}() output | ${title}`, (t) => {
    t.deepEqual(method(...input, { mutate, ...opts }), output)

    if (mutate) {
      t.deepEqual(target, output)
    }
  })
}
