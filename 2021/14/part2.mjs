import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' })
  .split('\n\n').map(s => s.trim())

const poly = input[0]
const instructions = []
const instRe = /(\w)(\w)\s+->\s+(\w)/g
let match
while ((match = instRe.exec(input[1])) != null) {
  instructions.push([match[1], match[2], match[3]])
}

const pairs = new Map()

for (let idx = 1; idx < poly.length; idx++) {
  const pair = poly.substr(idx - 1, 2)
  pairs.set(pair, (pairs.get(pair) ?? 0) + 1)
}

for (let iter = 0; iter < 40; iter++) {
  // console.log(iter, Array.from(pairs.values()).reduce((a, b) => a + b, 1))
  const nullifications = new Set()
  const changes = new Map()
  for (const [prev, curr, ins] of instructions) {
    const prevKey = `${prev}${curr}`
    const newKeyA = `${prev}${ins}`
    const newKeyB = `${ins}${curr}`

    const matches = pairs.get(prevKey)
    if (matches) {
      nullifications.add(prevKey)

      changes.set(newKeyA, (changes.get(newKeyA) ?? 0) + matches)
      changes.set(newKeyB, (changes.get(newKeyB) ?? 0) + matches)
    }
  }
  for (const pair of nullifications) pairs.delete(pair)
  for (const [pair, value] of changes.entries()) pairs.set(pair, (pairs.get(pair) ?? 0) + value)
}

const frequency = new Map()
// special to account for the first character in the polymer
frequency.set(poly[0], 1)

for (const [pair, value] of pairs.entries()) {
  frequency.set(pair[1], (frequency.get(pair[1]) ?? 0) + value)
}


const max = Math.max(...frequency.values())
const min = Math.min(...frequency.values())

console.log(max - min)
