import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(n => parseInt(n, 10))

outerLoop:
for (let idx = 25; idx < input.length - 1; idx++) {
  const num = input[idx]
  const preamble = input.slice(idx - 25, idx)

  for (const n1 of preamble) {
    for (const n2 of preamble) {
      if (n1 + n2 === num) continue outerLoop
    }
  }
  console.log(num)
  process.exit(0)
}
