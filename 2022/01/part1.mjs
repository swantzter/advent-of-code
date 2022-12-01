import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const elves = input.split('\n\n').map(elve => elve.split('\n').reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)))
const maxElve = Math.max(...elves)

console.log(maxElve)
