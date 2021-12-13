import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' })
  .split('\n\n').map(s => s.trim())

const coords = input[0].split('\n').map(row => {
  const [x,y] = row.split(',').map(d => parseInt(d, 10))
  return { x, y }
})
const instructions = input[1].split('\n').map(row => {
  const parts = row.substring('fold along '.length).split('=')
  return [parts[0], parseInt(parts[1], 10)]
})

for (const [dir, vert] of instructions) {
  for (let idx = 0; idx < coords.length; idx++) {
    const dot = coords[idx]
    if (dot[dir] === vert) {
      coords.splice(idx, 1)
      idx--
      continue
    }
    if (dot[dir] < vert) continue

    dot[dir] -= 2 * (dot[dir] - vert)
  }
}

const map = new Set()
let xmax = 0, ymax = 0

for (const { x, y } of coords) {
  if (x > xmax) xmax = x
  if (y > ymax) ymax = y
  map.add(`${x},${y}`)
}

// render map
for (let y = 0; y <= ymax; y++) {
  for (let x = 0; x <= xmax; x++) {
    process.stdout.write(`${map.has(`${x},${y}`) ? '#' : ' '}`)
  }
  process.stdout.write('\n')
}
