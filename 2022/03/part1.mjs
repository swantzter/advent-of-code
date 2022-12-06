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

const priority = input
  .split('\n')
  .map(row => {
    const items = row.split('')
    const comp1 = new Set(items.slice(0, items.length / 2))
    const comp2 = new Set(items.slice(items.length / 2))

    return intersection(comp1, comp2).values().next().value
  })
  .map(item => item.charCodeAt(0) > 90
    ? item.charCodeAt(0) - 96 // Lowercase comes after uppercase
    : item.charCodeAt(0) - 38 // and uppercase comes at an offset
  )
  .reduce((a, b) => a + b)

console.log(priority)
