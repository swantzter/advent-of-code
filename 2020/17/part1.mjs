import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map(row => row.split(''))

const map = new Map()

let minZ = 0, maxZ = 0,
    minY = 0, maxY = input.length - 1,
    minX = 0, maxX = input[0].length - 1

for (let y = minY; y <= maxY; y++)
  for (let x = minX; x <= maxX; x++)
    if (input[y][x] === '#') map.set(`${x},${y},${minZ}`, true)

function countSurrounding (map, cx, cy, cz) {
  let active = 0
  for (let x = cx - 1; x <= cx + 1; x++)
    for (let y = cy - 1; y <= cy + 1; y++)
      for (let z = cz - 1; z <= cz + 1; z++)
        if (x === cx && y === cy && z === cz) continue
        else active += map.has(`${x},${y},${z}`) ? 1 : 0
  return active
}

function render (map, iter) {
  if (process.argv[2] !== '--render') return
  console.log(`Cycle ${iter}`)
  for (let z = minZ; z <= maxZ; z++) {
    console.log(`z=${z}`)
    let rendered = ''
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        rendered += map.has(`${x},${y},${z}`) ? '#' : '.'
      }
      rendered += '\n'
    }
    console.log(rendered)
  }
}

render(map, 0)

for (let iter = 0; iter < 6; iter++) {
  const staging = []
  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        const count = countSurrounding(map, x, y, z)
        if (map.has(`${x},${y},${z}`)) {
          if (count !== 2 && count !== 3) staging.push([x, y, z, false])
        } else {
          if (count === 3) staging.push([x, y, z, true])
        }
      }
    }
  }

  for (const [x, y, z, state] of staging) {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (z < minZ) minZ = z

    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
    if (z > maxZ) maxZ = z

    if (state) map.set(`${x},${y},${z}`, true)
    else map.delete(`${x},${y},${z}`)
  }

  render(map, iter + 1)
}

console.log(map.size)
