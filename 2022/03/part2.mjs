import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

// Thank you MDN, for I am lazy
function intersection (setA, setB) {
  const _intersection = new Set()
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

const rucksacks = input
  .split('\n')
  .map(row => {
    const items = row.split('')
    return new Set(items)
  })

const badges = []
for (let idx = 1; idx < rucksacks.length; idx += 3) {
  badges.push(intersection(intersection(rucksacks[idx - 1], rucksacks[idx]), rucksacks[idx + 1]).values().next().value)
}

const priority = badges
  .map(item => item.charCodeAt(0) > 90
    ? item.charCodeAt(0) - 96 // Lowercase comes after uppercase
    : item.charCodeAt(0) - 38 // and uppercase comes at an offset
  )
  .reduce((a, b) => a + b)

console.log(priority)
