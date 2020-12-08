import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(row => [row.split(' ')[0], parseInt(row.split(' ')[1], 10)])
input.pop()

let pointer = 0
let memory = 0
const visited = new Set()

const instructions = {
  nop (arg) {
    pointer++
  },
  acc (arg) {
    memory += arg
    pointer++
  },
  jmp (arg) {
    pointer += arg
  }
}

while (!visited.has(pointer)) {
  visited.add(pointer)
  instructions[input[pointer][0]](input[pointer][1])

  if (pointer < 0 || pointer >= input.length)
    throw new TypeError('Pointer outside of memory')
}

console.log(memory)
