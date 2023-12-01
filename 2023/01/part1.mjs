import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n')

const firstRe = /^[^\d]*(\d)/
const lastRe = /(\d)[^\d]*$/

const result = input
  .map(row => {
    const firstMatch = row.match(firstRe)
    const lastMatch = row.match(lastRe)
    return parseInt(`${firstMatch[1]}${lastMatch[1]}`)
  })
  .reduce((a, b) => a + b)

console.log(result)
