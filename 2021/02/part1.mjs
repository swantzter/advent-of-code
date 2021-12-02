import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n').map(r => [r.split(' ')[0], parseInt(r.split(' ')[1], 10)])

const position = { horizontal: 0, depth: 0 }

for (const [direction, len] of input) {
  switch (direction) {
    case 'forward': {
      position.horizontal += len
      break
    }
    case 'up': {
      position.depth -= len
      break
    }
    case 'down': {
      position.depth += len
      break
    }
    default:
      throw new TypeError(`Unknown direction "${direction}"`)
  }
}

console.log(position.horizontal * position.depth)
