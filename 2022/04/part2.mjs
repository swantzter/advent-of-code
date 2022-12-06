import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const pairRegex = /(\d+)-(\d+),(\d+)-(\d+)/ig
let overlaps = 0

for (const match of input.matchAll(pairRegex)) {
  const elf1 = [parseInt(match[1], 10), parseInt(match[2], 10)]
  const elf2 = [parseInt(match[3], 10), parseInt(match[4], 10)]

  if (Math.max(elf1[0], elf2[0]) <= Math.min(elf1[1], elf2[1])) overlaps++
}

console.log(overlaps)
