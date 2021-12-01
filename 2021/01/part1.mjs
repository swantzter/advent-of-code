import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim().split('\n').map(n => parseInt(n))

const diffs = []

for (let idx = 1; idx < input.length; idx++) diffs.push(input[idx] - input[idx - 1])

console.log(diffs.filter(v => v > 0).length)
