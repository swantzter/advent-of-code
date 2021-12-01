import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim().split('\n').map(n => parseInt(n))

const windowSums = []
let increases = 0

for (let idx = 0; idx < input.length - 2; idx++)
  windowSums.push(input[idx] + input[idx + 1] + input[idx + 2])

for (let idx = 1; idx < windowSums.length; idx++)
  if (windowSums[idx] > windowSums[idx - 1])
    increases++

console.log(increases)
