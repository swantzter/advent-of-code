import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })

const stack = []
const instrRegex = /(\w+)(?:\[(\d+)\])?\s=\s(.*)/ig
let maxMemIdx = 0

for (const match of input.matchAll(instrRegex)) {
  if (match[1] === 'mem') {
    const memIdx = parseInt(match[2], 10)
    if (memIdx > maxMemIdx) maxMemIdx = memIdx
    stack.push([match[1], memIdx, match[3]])
  }
  else stack.push([match[1], match[3]])
}

/**
 * @param {string} mask
 * @param {number} value
 */
function maskValue (mask, value) {
  let result = ''
  let working = Math.abs(value).toString(2).padStart(36, '0')
  for (let idx = 0; idx < mask.length; idx++) {
    if (mask[idx] === 'X') result += working[idx]
    else result += mask[idx]
  }
  return parseInt(result, 2)
}

const memory = []
let mask

for (const [instruction, ...args] of stack) {
  switch (instruction) {
    case 'mem': {
      memory[args[0]] = maskValue(mask, args[1])
      break
    }
    case 'mask': {
      mask = args[0]
      break
    }
    default: throw new TypeError(`Unknown instruction ${instruction}`)
  }
}

console.log(memory.reduce((acc, curr) => acc + BigInt(curr), 0n))
