import { readFileSync } from 'fs'

/** @type {Array<string>} array[y][x] */
const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .filter(row => row.length)
const width = input[0].length

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

let multiTrees = 1

for (const [vx, vy] of slopes) {
  let x = 0, y = 0
  let encounters = 0

  do {
    if (input[y][x % width] === '#') encounters++

    x += vx
    y += vy
  } while (y < input.length)

  multiTrees *= encounters
}

console.log(multiTrees)
