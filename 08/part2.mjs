import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(row => [row.split(' ')[0], parseInt(row.split(' ')[1], 10)])
input.pop()

const instructions = {
  nop (arg) {
    this.pointer++
  },
  acc (arg) {
    this.memory += arg
    this.pointer++
  },
  jmp (arg) {
    this.pointer += arg
  }
}

for (let idx = 0; idx < input.length; idx++) {
  if (input[idx][0] === 'acc') continue // skip acc's
  const prevVal = input[idx][0]
  input[idx][0] = input[idx][0] === 'nop' ? 'jmp' : 'nop'
  const thisArg = {
    pointer: 0,
    memory: 0,
    visited: new Set()
  }

  while (!thisArg.visited.has(thisArg.pointer)) {
    thisArg.visited.add(thisArg.pointer)
    instructions[input[thisArg.pointer][0]].call(thisArg, input[thisArg.pointer][1])

    if (thisArg.pointer === input.length) {
      console.log(thisArg.memory)
      process.exit(0)
    }
    if (thisArg.pointer < 0 || thisArg.pointer >= input.length)
      throw new TypeError('Pointer outside of memory')
  }

  input[idx][0] = prevVal
}
