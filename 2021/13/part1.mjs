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
  // part 1 just does one fold
  break
}

const map = new Set()
for (const dot of coords) map.add(`${dot.x},${dot.y}`)

console.log(map.size)
