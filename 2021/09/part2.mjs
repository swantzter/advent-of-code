import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n')

const map = new Map()
const ymax = input.length
const xmax = input[0].length
const lowPoints = []

for (let y = 0; y < input.length; y++) {
  let row = input[y].split('')
  for (let x = 0; x < row.length; x++) {
    map.set(`${x},${y}`, parseInt(row[x], 10))
  }
}

for (let y = 0; y < ymax; y++) {
  for (let x = 0; x < xmax; x++) {
    let p = map.get(`${x},${y}`) ?? 0

    let t = map.get(`${x},${y - 1}`)
    let r = map.get(`${x + 1},${y}`)
    let b = map.get(`${x},${y + 1}`)
    let l = map.get(`${x - 1},${y}`)

    if (
      (t === undefined ? true: p < t) &&
      (r === undefined ? true: p < r) &&
      (b === undefined ? true: p < b) &&
      (l === undefined ? true: p < l)
    ) lowPoints.push([x, y, p])
  }
}


function sprawlOut (x, y, set = new Set()) {
  const points = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
  set.add(`${x},${y}`)

  for (const [x, y] of points) {
    let v = map.get(`${x},${y}`)
    if (v == null || v === 9) continue
    if (set.has(`${x},${y}`)) continue
    sprawlOut(x, y, set)
  }

  return set
}

const basins = lowPoints.map(([x, y]) => sprawlOut(x, y))
basins.sort((a, b) => b.size - a.size)

// render map
// const inBasin = new Set()
// for (const basin of basins)
//   for (const point of basin)
//     inBasin.add(point)

// for (let y = 0; y < ymax; y++) {
//   for (let x = 0; x < xmax; x++) {
//     process.stdout.write(`${inBasin.has(`${x},${y}`) ? '#' : ' '}`)
//   }
//   process.stdout.write('\n')
// }

console.log(basins[0].size * basins[1].size * basins[2].size)
