import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const instructions = input.split('\n').reverse()

let cycle = 1
let x = 1

const waitTimes = {
  noop: 1,
  addx: 2
}

/** @type {{ remaining: number; instruction: string; args: any[] }} */
let waiting

const measurePoints = []

while (instructions.length) {
  const [instruction, ...args] = instructions.pop().split(' ')
  waiting = { remaining: waitTimes[instruction], instruction, args }

  while (waiting != null) {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      measurePoints.push([x, cycle])
    }

    waiting.remaining -= 1

    if (waiting.remaining === 0) {
      switch (waiting.instruction) {
        case 'noop':
          break
        case 'addx':
          x += parseInt(waiting.args[0], 10)
          break
      }
      waiting = undefined
    }

    cycle += 1
  }
}

console.log(measurePoints.map(([x, c]) => x * c).reduce((a, b) => a + b))
