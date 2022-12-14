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

const pixels = new Set()

function drawScreen () {
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 40; x++) {
      if (pixels.has(`${x},${y}`)) process.stdout.write('#')
      else process.stdout.write(' ')
    }
    process.stdout.write('\n')
  }
}

while (instructions.length) {
  const [instruction, ...args] = instructions.pop().split(' ')
  waiting = { remaining: waitTimes[instruction], instruction, args }

  while (waiting != null) {
    const pos = (cycle - 1) % 40
    if (x - 1 === pos || x === pos || x + 1 === pos) pixels.add(`${pos},${Math.floor(cycle / 40)}`)

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

drawScreen()
