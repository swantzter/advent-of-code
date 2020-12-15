import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split(',')
  .map(n => parseInt(n, 10))

// number => lastIndex
const indexes = new Map()
const target = 30000000

for (let idx = 0; idx < input.length - 1; idx++) {
  indexes.set(input[idx], idx)
}

let current = input[input.length - 1]

for (let idx = input.length; idx < target; idx++) {
  let newVal
  if (!indexes.has(current)) {
    newVal = 0
  } else {
    let prevIdx = indexes.get(current)
    newVal = idx - prevIdx - 1
  }

  indexes.set(current, idx - 1)
  current = newVal
}

console.log(current)
