import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n').map(n => parseInt(n))

for (const n1 of input) {
  for (const n2 of input) {
    if (n1 + n2 === 2020) {
      console.log(n1, n2, n1 * n2)
      process.exit(0)
    }
  }
}

process.exit(1)
