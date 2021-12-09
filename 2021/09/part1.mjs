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

const riskLevel = lowPoints.reduce((acc, curr) => acc + curr[2] + 1, 0)

console.log(riskLevel)
