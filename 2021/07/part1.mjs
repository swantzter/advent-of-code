import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split(',').map(n => parseInt(n, 10))

const min = Math.min(...input)
const max = Math.max(...input)

let optimal = [Infinity, Infinity]

for (let idx = min; idx < max + 1; idx++) {
  const fuel = input.map(p => Math.abs(p - idx)).reduce((a, b) => a + b)
  if (fuel < optimal[1]) optimal = [idx, fuel]
}

console.log(optimal[1])
