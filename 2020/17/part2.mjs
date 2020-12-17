import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map(row => row.split(''))

const map = new Map()

let minZ = 0, maxZ = 0,
    minW = 0, maxW = 0,
    minY = 0, maxY = input.length - 1,
    minX = 0, maxX = input[0].length - 1

for (let y = minY; y <= maxY; y++)
  for (let x = minX; x <= maxX; x++)
    if (input[y][x] === '#') map.set(`${x},${y},${minZ},${minW}`, true)

function countSurrounding (map, cx, cy, cz, cw) {
  let active = 0
  for (let x = cx - 1; x <= cx + 1; x++)
    for (let y = cy - 1; y <= cy + 1; y++)
      for (let z = cz - 1; z <= cz + 1; z++)
        for (let w = cw - 1; w <= cw + 1; w++)
          if (x === cx && y === cy && z === cz && w === cw) continue
          else active += map.has(`${x},${y},${z},${w}`) ? 1 : 0
  return active
}

for (let iter = 0; iter < 6; iter++) {
  const staging = []
  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        for (let w = minW - 1; w <= maxW + 1; w++) {
          const count = countSurrounding(map, x, y, z, w)
          if (map.has(`${x},${y},${z},${w}`)) {
            if (count !== 2 && count !== 3) staging.push([x, y, z, w, false])
          } else {
            if (count === 3) staging.push([x, y, z, w, true])
          }
        }
      }
    }
  }

  for (const [x, y, z, w, state] of staging) {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (z < minZ) minZ = z
    if (w < minW) minW = w

    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
    if (z > maxZ) maxZ = z
    if (w > maxW) maxW = w

    if (state) map.set(`${x},${y},${z},${w}`, true)
    else map.delete(`${x},${y},${z},${w}`)
  }
}

console.log(map.size)
