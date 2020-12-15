import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
input.pop()

const rowIdxs = 127, colIdxs = 7
const seatIds = []

/**
 * @param {number} num
 * @param {Array<-1 | 1>} sections 1 indicates take the top half, -1 take the bottom half
 */
function search (num, sections) {
  let top = num, bottom = 0
  for (const dir of sections) {
    if (dir === 1) bottom += .5 * (top - bottom + 1)
    else if (dir === -1) top -= .5 * (top - bottom + 1)
    else throw new TypeError('Must pick top or bottom half')
  }
  return bottom
}

for (const instruction of input) {
  let convertedInstruction = instruction.split('')
    .map(ins => ins === 'B' || ins === 'R' ? 1 : -1)

  const row = search(rowIdxs, convertedInstruction.slice(0, 7))
  const col = search(colIdxs, convertedInstruction.slice(7))

  seatIds.push(row * 8 + col)
}

console.log(Math.max(...seatIds))
