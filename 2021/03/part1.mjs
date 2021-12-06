import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n').map(r => r.split('').map(x => parseInt(x, 10)))

const counts = []

for (let idx = 0; idx < input[0].length; idx++) {
  counts[idx] = [0, 0]
  for (const row of input) {
    counts[idx][row[idx]] += 1
  }
}

const gamma = parseInt(counts.map(([z, o]) => z > o ? '0' : '1').join(''), 2)
const epsilon = parseInt(counts.map(([z, o]) => z < o ? '0' : '1').join(''), 2)

console.log(gamma * epsilon)
