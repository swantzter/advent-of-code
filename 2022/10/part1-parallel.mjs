import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const instructions = input.split('\n').reverse()

let cycle = 0
let x = 1

const waitTimes = {
  noop: 1,
  addx: 2
}

/** @type {Array<{ remaining: number; instruction: string; args: any[] }>} */
const waiting = []

const measurePoints = []

while (true) {
  cycle += 1

  if (instructions.length > 0) {
    const [instruction, ...args] = instructions.pop().split(' ')
    waiting.push({ remaining: waitTimes[instruction], instruction, args })
  }

  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    measurePoints.push([x, cycle])
  }

  for (let idx = 0; idx < waiting.length; idx++) {
    waiting[idx].remaining -= 1

    if (waiting[idx].remaining === 0) {
      const [instr] = waiting.splice(idx, 1)

      switch (instr.instruction) {
        case 'noop':
          break
        case 'addx':
          x += parseInt(instr.args[0], 10)
          break
      }
    }
  }

  if (instructions.length === 0 && waiting.length === 0) break
}

console.log(measurePoints)
