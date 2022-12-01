import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const elves = input.split('\n\n')
  .map(elve =>
    elve.split('\n').map(cal => parseInt(cal, 10)).reduce((a, b) => a + b))
  .sort((a, b) => b - a)
const topThree = elves.slice(0, 3).reduce((a, b) => a + b)

console.log(topThree)
