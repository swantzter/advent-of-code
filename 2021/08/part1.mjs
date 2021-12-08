import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n').map(row => row.split(' | ').map(s => s.split(' ')))

const searchLengths = [2, 3, 4, 7]

const occurrences = input.map(([signals, outputs]) => outputs.filter(el => searchLengths.includes(el.length)).length)
  .reduce((a, b) => a + b)

console.log(occurrences)
