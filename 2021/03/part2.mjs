import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n').map(r => r.split('').map(x => parseInt(x, 10)))


  function mostCommon (arr, idx) {
  const counts = []

  for (let idx = 0; idx < arr[0].length; idx++) {
    counts[idx] = [0, 0]
    for (const row of arr) {
      counts[idx][row[idx]] += 1
    }
  }

  if (counts[idx][0] === counts[idx][1]) return 1
  return counts[idx][0] > counts[idx][1] ? 0 : 1
}

let oxygen = [...input]

for (let idx = 0; idx < oxygen[0].length && oxygen.length > 1; idx++) {
  const mc = mostCommon(oxygen, idx)
  oxygen = oxygen.filter(row => row[idx] === mc)
}

oxygen = parseInt(oxygen.pop().join(''), 2)

let co2 = [...input]

for (let idx = 0; idx < co2[0].length && co2.length > 1; idx++) {
  const lc = mostCommon(co2, idx) ? 0 : 1 // inverse
  co2 = co2.filter(row => row[idx] === lc)
}

co2 = parseInt(co2.pop().join(''), 2)

console.log(oxygen * co2)
