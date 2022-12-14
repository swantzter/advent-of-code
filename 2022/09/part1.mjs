import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const hPos = { x: 0, y: 0 }
const tPos = { x: 0, y: 0 }

const visited = new Set()

const mapBounds = {
  yMin: 0,
  yMax: 4,
  xMin: 0,
  xMax: 5
}
function draw () {
  if (Math.min(hPos.y, tPos.y) < mapBounds.yMin) mapBounds.yMin = Math.min(hPos.y, tPos.y)
  if (Math.max(hPos.y, tPos.y) > mapBounds.yMax) mapBounds.yMax = Math.max(hPos.y, tPos.y)
  if (Math.min(hPos.x, tPos.x) < mapBounds.xMin) mapBounds.xMin = Math.min(hPos.x, tPos.x)
  if (Math.max(hPos.x, tPos.x) > mapBounds.xMax) mapBounds.xMax = Math.max(hPos.x, tPos.x)

  for (let y = mapBounds.yMax; y >= mapBounds.yMin; y--) {
    for (let x = mapBounds.xMin; x <= mapBounds.xMax; x++) {
      if (hPos.x === x && hPos.y === y) process.stdout.write('H')
      else if (tPos.x === x && tPos.y === y) process.stdout.write('T')
      else process.stdout.write('.')
    }
    process.stdout.write('\n')
  }

  process.stdout.write('\n')
}

const instrReg = /(?<dir>U|L|R|D)\s+(?<steps>\d+)/gi
let match
while ((match = instrReg.exec(input)) != null) {
  const dir = match.groups.dir.toUpperCase()
  const steps = parseInt(match.groups.steps, 10)

  for (let i = 0; i < steps; i++) {
    // Move Head
    switch (dir) {
      case 'U':
        hPos.y += 1
        break
      case 'D':
        hPos.y -= 1
        break
      case 'R':
        hPos.x += 1
        break
      case 'L':
        hPos.x -= 1
        break
    }

    const dx = hPos.x - tPos.x
    const dy = hPos.y - tPos.y

    if (Math.abs(dx) > 1 && dy === 0) tPos.x = tPos.x + (dx > 0 ? 1 : -1)
    else if (Math.abs(dy) > 1 && dx === 0) tPos.y = tPos.y + (dy > 0 ? 1 : -1)
    else if (
      (Math.abs(dy) > 1 && Math.abs(dx) > 0) ||
      (Math.abs(dx) > 1 && Math.abs(dy) > 0)
    ) {
      tPos.x = tPos.x + (dx > 0 ? 1 : -1)
      tPos.y = tPos.y + (dy > 0 ? 1 : -1)
    }

    visited.add(`${tPos.x},${tPos.y}`)

    // draw()
  }
}

console.log(visited.size)
