import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n').map(r => [r.split(' ')[0], parseInt(r.split(' ')[1], 10)])

const position = { horizontal: 0, depth: 0, aim: 0 }

for (const [direction, len] of input) {
  switch (direction) {
    case 'forward': {
      position.horizontal += len
      position.depth += len * position.aim
      break
    }
    case 'up': {
      position.aim -= len
      break
    }
    case 'down': {
      position.aim += len
      break
    }
    default:
      throw new TypeError(`Unknown direction "${direction}"`)
  }
}

console.log(position.horizontal * position.depth)
