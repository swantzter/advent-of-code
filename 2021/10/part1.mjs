import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n')

const cmap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const pts = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

let score = 0

for (const row of input) {
  const stack = []

  for (let idx = 0; idx < row.length; idx++) {
    let ch = row[idx]
    if (ch in cmap) stack.push(ch)
    else {
      // closing char
      if (ch === cmap[stack.at(-1)]) {
        stack.pop()
        continue
      } else {
        score += pts[ch]
        break
      }
    }
  }
}

console.log(score)
