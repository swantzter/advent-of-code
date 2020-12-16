import { readFileSync } from 'fs'

let [rules, myTicket, otherTickets] =
  readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')

const ruleRegex = /^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)/i

const valid = new Set()
rules = new Map(rules.split('\n').map(row => {
  const [_, field, min1, max1, min2, max2] = ruleRegex.exec(row)
  const set = new Set()
  for (let i = parseInt(min1, 10); i <= parseInt(max1); i++) {
    set.add(i)
    valid.add(i)
  }
  for (let i = parseInt(min2, 10); i <= parseInt(max2); i++) {
    set.add(i)
    valid.add(i)
  }
  return [field, set]
}))

otherTickets = otherTickets.split('\n')
otherTickets.shift()
otherTickets = otherTickets
  .map(row => row.split(',').map(n => parseInt(n, 10)))
  .filter(ticket => ticket.every(n => valid.has(n)))

myTicket = myTicket
  .split('\n')[1]
  .split(',')
  .map(n => parseInt(n, 10))

const columns = []
for (const ticket of otherTickets) {
  for (let idx = 0; idx < ticket.length; idx++) {
    if (columns[idx]) columns[idx].push(ticket[idx])
    else columns[idx] = [ticket[idx]]
  }
}

const fieldsCols = new Map()
const completeCols = new Map()

for (const [field, valids] of rules) {
  let idxs = columns
    .map((col, idx) => [col, idx])
    .filter(([col]) => col.every(num => valids.has(num)))
    .map(([col, idx]) => idx)
  fieldsCols.set(field, new Set(idxs))
}

while (fieldsCols.size) {
  let curr
  for (const [field, values] of fieldsCols) {
    if (values.size === 1) {
      curr = [field, Array.from(values).shift()]
      break
    }
  }
  fieldsCols.delete(curr[0])
  completeCols.set(curr[0], curr[1])
  for (const [field, values] of fieldsCols) {
    values.delete(curr[1])
  }
}

console.log(
  Array.from(completeCols.entries())
    .filter(([field]) => field.startsWith('departure'))
    .reduce((acc, [_, idx]) => acc * myTicket[idx], 1)
)
