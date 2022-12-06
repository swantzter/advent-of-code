import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' })

const [crates, instructions] = input.split('\n\n')

const crateRows = crates.split('\n')

const stacks = crateRows
  .pop()
  .trim()
  .split('   ')
  .map(n => [n, []])

while (crateRows.length > 0) {
  const row = crateRows.pop()
  for (let idx = 0; idx * 4 < row.length; idx++) {
    const char = row.substring((idx * 4) + 1, (idx * 4) + 2)
    if (char === ' ') continue
    stacks[idx][1].push(char)
  }
}

const stacksObj = Object.fromEntries(stacks)

const instrRegex = /move (?<numCrates>\d+) from (?<from>\d+) to (?<to>\d+)/g
let match
while ((match = instrRegex.exec(instructions)) != null) {
  const numCrates = parseInt(match.groups.numCrates, 10)
  const from = match.groups.from
  const to = match.groups.to

  stacksObj[to].push(...stacksObj[from].splice(stacksObj[from].length - numCrates, stacksObj[from].length))
}

let str = ''
for (const stack of stacks) {
  str += stack[1].pop() ?? ''
}

console.log(str)
