import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

// A = Rock = X (1)
// B = Paper = Y (2)
// C = Scissors = Z (3)

const norm = {
  A: 'R',
  B: 'P',
  C: 'S',

  X: 'R',
  Y: 'P',
  Z: 'S'
}
const points = {
  R: 1,
  P: 2,
  S: 3
}

const moves = input.split('\n')
  .map(row => {
    const [op, me] = row.split(' ')
    return [norm[op], norm[me]]
  })

const scores = moves.map(([op, me]) => {
  let sc = points[me]
  if (op === me) sc += 3
  else if (
    (op === 'S' && me === 'R') ||
    (op === 'P' && me === 'S') ||
    (op === 'R' && me === 'P')
  ) sc += 6
  return sc
})

const total = scores.reduce((a, b) => a + b)

console.log(total)
