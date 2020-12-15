import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(n => parseInt(n, 10))

let target

outerLoop:
for (let idx = 25; idx < input.length - 1; idx++) {
  const num = input[idx]
  const preamble = input.slice(idx - 25, idx)

  for (const n1 of preamble) {
    for (const n2 of preamble) {
      if (n1 + n2 === num) continue outerLoop
    }
  }
  target = num
  break
}

for (let startIdx = 0; startIdx < input.length - 1; startIdx++) {
  for (let endIdx = startIdx + 1; endIdx < input.length - 1; endIdx++) {
    const numbers = input.slice(startIdx, endIdx)
    const sum = numbers.reduce((a, b) => a + b)
    if (sum === target) {
      numbers.sort((a, b) => a - b)
      console.log(numbers[0] + numbers[numbers.length - 1])
      process.exit(0)
    }
  }
}
