import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] && /[^\d]/.test(process.argv[2]) ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split(',').map(n => parseInt(n, 10))

let iterations = 256
if (process.argv.length === 4) iterations = parseInt(process.argv[3], 10)
else if (process.argv.length === 3 && /^\d+$/.test(process.argv[2])) iterations = parseInt(process.argv[2], 10)

const fishPerDay = new Array(9).fill(0).map((_, idx) => input.filter(n => n === idx).length)

for (let day = 0; day < iterations; day++) {
  const expiring = fishPerDay.shift()
  // create that many new fish
  fishPerDay.push(expiring)
  // reset expiring fish timers to 6
  fishPerDay[6] += expiring
}

console.log(fishPerDay.reduce((a, b) => a + b))
