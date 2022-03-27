// Demo of the main usage.
// This file can be directly run:
//   - first install `wild-wild-utils`
//   - then `node node_modules/wild-wild-utils/examples/main.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/wild-wild-utils

import { get } from 'wild-wild-utils'

console.log(get({ one: { two: true } }, 'one.two'))
