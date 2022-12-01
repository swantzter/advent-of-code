import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const posRe = /(\d+)\s+starting\s+position:\s+(\d+)/g

const pawns = []

let match
while ((match = posRe.exec(input)) != null) {
  pawns[parseInt(match[1], 10) - 1] = {
    pos: parseInt(match[2], 10) - 1,
    score: 0
  }
}

let die = 1, idx = 0
while (pawns.every(({ score }) => score < 1000)) {
  const steps = (3 * die) + 3

  pawns[idx].pos = (pawns[idx].pos + steps) % 10
  pawns[idx].score += pawns[idx].pos + 1

  die += 3
  idx = (idx + 1) % pawns.length
}

const loser = Math.min(...pawns.map(({ score}) => score))

console.log(loser * (die - 1))
