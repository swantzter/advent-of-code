import { readFileSync } from 'fs'

let input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')

input.pop()

const width = input[0].length
const height = input.length

let didChange = true

function replaceAt (str, idx, char) {
  return str.substr(0, idx) + char + str.substr(idx + 1)
}

function walk (map, y, x, vy, vx) {
  if (map[y + vy]?.[x + vx] === undefined) return 0
  if (map[y + vy][x + vx] === '.') return walk(map, y + vy, x + vx, vy, vx)
  if (map[y + vy][x + vx] === 'L') return 0
  if (map[y + vy][x + vx] === '#') return 1
}

while (didChange) {
  didChange = false
  let staged = [...input]

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === '.') continue

      if (input[y][x] === 'L') {
        let occupiedAdjacent = 0
        for (let yd = -1; yd <= 1; yd++) {
          for (let xd = -1; xd <= 1; xd++) {
            if (xd === 0 && yd === 0) continue
            occupiedAdjacent += walk(input, y, x, yd, xd)
          }
        }
        if (occupiedAdjacent === 0) {
          staged[y] = replaceAt(staged[y], x, '#')
          didChange = true
        }
        continue
      }

      if (input[y][x] === '#') {
        let occupiedAdjacent = 0
        for (let yd = -1; yd <= 1; yd++) {
          for (let xd = -1; xd <= 1; xd++) {
            if (xd === 0 && yd === 0) continue
            occupiedAdjacent += walk(input, y, x, yd, xd)
          }
        }
        if (occupiedAdjacent >= 5) {
          staged[y] = replaceAt(staged[y], x, 'L')
          didChange = true
        }
        continue
      }
    }
  }

  // commit
  input = staged
}

console.log(input.join('').replace(/[^#]/g, '').length)
