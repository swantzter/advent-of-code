import { readFileSync } from 'fs'

/** @type {Array<Array<string>>} array[y][x] */
const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .filter(row => row.length)
  .map(row => row.split(''))
const width = input[0].length

let x = 0, y = 0
let vx = 3, vy = 1
let encounters = 0


do {
  if (input[y][x % width] === '#') encounters++

  x += vx
  y += vy
} while (y < input.length)

console.log(encounters)
