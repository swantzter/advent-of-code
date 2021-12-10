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
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

let scores = []

for (const row of input) {
  const stack = []
  let corrupt = false

  for (let idx = 0; idx < row.length; idx++) {
    let ch = row[idx]
    if (ch in cmap) stack.push(ch)
    else {
      // closing char
      if (ch === cmap[stack.at(-1)]) {
        stack.pop()
        continue
      } else {
        corrupt = true
        break
      }
    }
  }

  if (corrupt) continue

  let ch, score = 0
  while ((ch = stack.pop()) != null) {
    score *= 5
    score += pts[cmap[ch]]
  }
  scores.push(score)
}

scores.sort((a, b) => a - b)

console.log(scores[Math.round((scores.length - 1) / 2)])
