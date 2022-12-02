import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

// A = Rock (1)
// B = Paper (2)
// C = Scissors (3)

// X = Lose
// Y = Draw
// Z = Win

const points = {
  A: 1, // R
  B: 2, // P
  C: 3 // S
}

const moves = {
  A: { // Rock
    X: 'C', // Lose - Scissors
    Y: 'A', // Draw - Rock
    Z: 'B' // Win - Paper
  },
  B: { // Paper
    X: 'A', // Lose - Rock
    Y: 'B', // Draw - Paper
    Z: 'C' // Win - Scissors
  },
  C: { // Scissors
    X: 'B', // Lose - Paper
    Y: 'C', // Draw - Scissors
    Z: 'A' // Win - Rock
  }
}

const scores = input.split('\n')
  .map(row => {
    const [op, out] = row.split(' ')
    const me = moves[op][out]

    let sc = points[me]
    if (out === 'Y') sc += 3
    else if (out === 'Z') sc += 6

    return sc
  })

const total = scores.reduce((a, b) => a + b)

console.log(total)
