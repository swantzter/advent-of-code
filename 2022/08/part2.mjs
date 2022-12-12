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

const yMax = rows.length - 1
const xMax = rows[0].length - 1

const checkDirs = [
  [ 0, -1],
  [-1,  0],
  [ 1,  0],
  [ 0,  1]
]

const scores = new Map()

for (const [coords, height] of map.entries()) {
  const [x, y] = coords.split(',').map(p => parseInt(p, 10))
  let score = 1

  for (const [vx, vy] of checkDirs) {
    let point
    let px = x
    let py = y
    do {
      px += vx
      py += vy
      point = map.get(`${px},${py}`)

      if (point >= height || point == null) {
        score *= Math.max(
          px < 0 ? x : (px > xMax ? xMax - x : Math.abs(x - px)),
          py < 0 ? y : (py > yMax ? yMax - y : Math.abs(y - py))
        )
        break
      }
    } while (point != null)
  }
  scores.set(coords, score)
}

console.log(Math.max(...scores.values()))
