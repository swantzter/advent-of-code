import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(n => parseInt(n, 10))
  .sort((a, b) => a - b)
input.pop()

const differences = {
  '1': 0,
  '2': 0,
  '3': 1 // the difference to the device
}
differences[input[0]]++
for (let i = input.length - 1; i > 0; i--) {
  differences[input[i] - input[i - 1]]++
}

console.log(differences['1'] * differences['3'])
