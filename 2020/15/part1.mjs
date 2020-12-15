import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split(',')
  .map(n => parseInt(n, 10))

// number => [lastIndex, 2ndLastIndex, ...]
const indexes = new Map()
const target = 2020

for (let idx = 0; idx < input.length - 1; idx++) {
  if (indexes.has(input[idx])) indexes.get(input[idx]).unshift(idx)
  else indexes.set(input[idx], [idx])
}

let current = input[input.length - 1]

for (let idx = input.length; idx < target; idx++) {
  let newVal
  if (!indexes.has(current)) {
    newVal = 0
  } else {
    let prevIdx = indexes.get(current)[0]
    newVal = idx - prevIdx - 1
  }

  if (indexes.has(current)) indexes.get(current).unshift(idx - 1)
  else indexes.set(current, [idx - 1])

  current = newVal
}

console.log(current)
