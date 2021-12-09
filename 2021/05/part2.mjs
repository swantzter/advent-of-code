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
  const dx = Math.sign(x2 - x1)
  const dy = Math.sign(y2 - y1)

  let x = x1 - dx, y = y1 - dy

  do {
    if (y !== y2) y += dy
    if (x !== x2) x += dx
    map.set(`${x},${y}`, (map.get(`${x},${y}`) ?? 0) + 1)
  } while (x !== x2 || y !== y2)
}

// render map
// for (let y = 0; y <= Math.max(...lines.map(l => Math.max(l.y1, l.y2))); y++) {
//   for (let x = 0; x <= Math.max(...lines.map(l => Math.max(l.x1, l.x2))); x++) {
//     process.stdout.write(`${map.get(`${x},${y}`) ?? '.'}`)
//   }
//   process.stdout.write('\n')
// }

console.log(Array.from(map.values()).filter(v => v > 1).length)
