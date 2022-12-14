import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const knots = new Array(10).fill(undefined).map(k => ({ x: 0, y: 0 }))

const visited = new Set()

const mapBounds = {
  yMin: 0,
  yMax: 4,
  xMin: 0,
  xMax: 5
}
function draw () {
  for (const knot of knots) {
    if (knot.y < mapBounds.yMin) mapBounds.yMin = knot.y
    if (knot.y > mapBounds.yMax) mapBounds.yMax = knot.y
    if (knot.x < mapBounds.xMin) mapBounds.xMin = knot.x
    if (knot.x > mapBounds.xMax) mapBounds.xMax = knot.x
  }

  for (let y = mapBounds.yMax; y >= mapBounds.yMin; y--) {
    for (let x = mapBounds.xMin; x <= mapBounds.xMax; x++) {
      let written = false
      for (let kId = 0; kId < knots.length; kId++) {
        const knot = knots[kId]
        if (knot.x === x && knot.y === y) {
          process.stdout.write(kId === 0 ? 'H' : `${kId}`)
          written = true
          break
        }
      }
      if (!written) process.stdout.write('.')
    }
    process.stdout.write('\n')
  }

  process.stdout.write('\n')
}

function drawVisited () {
  for (let y = mapBounds.yMax; y >= mapBounds.yMin; y--) {
    for (let x = mapBounds.xMin; x <= mapBounds.xMax; x++) {
      if (visited.has(`${x},${y}`)) process.stdout.write('#')
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
        knots[0].y += 1
        break
      case 'D':
        knots[0].y -= 1
        break
      case 'R':
        knots[0].x += 1
        break
      case 'L':
        knots[0].x -= 1
        break
    }

    for (let kId = 1; kId < knots.length; kId++) {
      const hPos = knots[kId - 1]
      const tPos = knots[kId]

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

      if (kId === knots.length - 1) visited.add(`${tPos.x},${tPos.y}`)
    }

    // draw()
  }
}

// drawVisited()

console.log(visited.size)
