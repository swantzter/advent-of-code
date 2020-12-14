import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })

const stack = []
const instrRegex = /(\w+)(?:\[(\d+)\])?\s=\s(.*)/ig
let maxMemIdx = 0

for (const match of input.matchAll(instrRegex)) {
  if (match[1] === 'mem') {
    const memIdx = parseInt(match[2], 10)
    if (memIdx > maxMemIdx) maxMemIdx = memIdx
    stack.push([match[1], memIdx, parseInt(match[3], 10)])
  }
  else stack.push([match[1], match[3]])
}

function replaceAt (str, idx, char) {
  return str.substr(0, idx) + `${char}` + str.substr(idx + 1)
}

/**
 * @param {string} mask
 * @param {number} value
 */
function maskValue (mask, value) {
  let working = (BigInt(value) | BigInt(parseInt(mask.replace(/[^\d]/gi, '0'), 2))).toString(2).padStart(36, '0')
  const results = [working]
  for (let idx = 0; idx < mask.length; idx++) {
    if (mask[idx] !== 'X') continue
    for (let rIdx = results.length - 1; rIdx >= 0; rIdx--) {
      results.push(replaceAt(results[rIdx], idx, Number(!Number(results[rIdx][idx]))))
    }
  }
  return [...new Set(results.map(result => parseInt(result, 2))).values()]
}

const memory = new Map()
let mask

for (let idx = 0; idx < stack.length; idx++) {
  const [instruction, ...args] = stack[idx]
  switch (instruction) {
    case 'mem': {
      const addresses = maskValue(mask, args[0])
      for (const address of addresses) {
        memory.set(address, args[1])
      }
      break
    }
    case 'mask': {
      mask = args[0]
      break
    }
    default: throw new TypeError(`Unknown instruction ${instruction}`)
  }
}

console.log([...memory.values()].reduce((acc, curr) => acc + BigInt(curr), 0n))
