import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' })
  .split('\n\n').map(s => s.trim())

const poly = input[0].split('')
const instructions = []
const instRe = /(\w)(\w)\s+->\s+(\w)/g
let match
while ((match = instRe.exec(input[1])) != null) {
  instructions.push([match[1], match[2], match[3]])
}

for (let iter = 0; iter < 10; iter++) {
  for (let idx = 1; idx < poly.length; idx++) {
    for (const [prev, curr, ins] of instructions) {
      if (poly[idx - 1] === prev && poly[idx] === curr) {
        poly.splice(idx, 0, ins)
        idx++
        break
      }
    }
  }
}

const frequency = new Map()

for (const char of poly) {
  frequency.set(char, (frequency.get(char) ?? 0) + 1)
}

const max = Math.max(...frequency.values())
const min = Math.min(...frequency.values())

console.log(max - min)
