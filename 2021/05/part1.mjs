import { readFileSync } from 'fs'
import { join as pjoin } from 'path'


const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const lines = []
const re = /(?<x1>\d+),(?<y1>\d+)\s+->\s+(?<x2>\d+),(?<y2>\d+)/mg
let match
while ((match = re.exec(input)) !== null) {
  lines.push(Object.fromEntries(Object.entries(match.groups).map(([k, v]) => [k, parseInt(v, 10)])))
}

const map = new Map()

for (const { x1, y1, x2, y2 } of lines) {
  if (x1 !== x2 && y1 !== y2) continue
  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++)
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
      map.set(`${x},${y}`, (map.get(`${x},${y}`) ?? 0) + 1)
}

console.log(Array.from(map.values()).filter(v => v > 1).length)
