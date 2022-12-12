import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const map = new Map()
const rows = input.split('\n')
for (let yIdx = 0; yIdx < rows.length; yIdx++) {
  const row = rows[yIdx]
  for (let xIdx = 0; xIdx < row.length; xIdx++) {
    map.set(`${xIdx},${yIdx}`, parseInt(row[xIdx], 10))
  }
}

const checkDirs = [
  [ 0,  1],
  [ 0, -1],
  [ 1,  0],
  [-1,  0]
]

const visible = new Set()

for (const [coords, height] of map.entries()) {
  const [x, y] = coords.split(',').map(p => parseInt(p, 10))
  let vis = false

  for (const [vx, vy] of checkDirs) {
    let point
    let px = x
    let py = y
    do {
      px += vx
      py += vy
      point = map.get(`${px},${py}`)

      if (point >= height) break
      else if (point == null) {
        vis = true
        visible.add(coords)
      }
    } while (point != null && !vis)
    if (vis) break
  }
}

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < rows[0].length; x++) {
    process.stdout.write(visible.has(`${x},${y}`) ? `${map.get(`${x},${y}`)}` : '.')
  }
  process.stdout.write('\n')
}

console.log(visible.size)
