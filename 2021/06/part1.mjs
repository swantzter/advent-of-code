import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] && /[^\d]/.test(process.argv[2]) ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split(',').map(n => parseInt(n, 10))

let iterations = 80
if (process.argv.length === 4) iterations = parseInt(process.argv[3], 10)
else if (process.argv.length === 3 && /^\d+$/.test(process.argv[2])) iterations = parseInt(process.argv[2], 10)

for (let day = 0; day < iterations; day++) {
  // break out len first since the array might grow,
  // so we can't check length each iteration.
  // It's like going back to the time you had to do this as .length
  // had a performance hit
  let len = input.length
  for (let idx = 0; idx < len; idx++) {
    if (input[idx] === 0) {
      input[idx] = 6
      input.push(8)
    } else input[idx]--
  }
}

console.log(input.length)
