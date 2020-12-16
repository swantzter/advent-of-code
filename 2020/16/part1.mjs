import { readFileSync } from 'fs'

let [rules, myTicket, otherTickets] =
  readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')

const ruleRegex = /^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)/i

// function expandRange (min, max) {
//   const res = []
//   for (let i = parseInt(min, 10); i <= parseInt(max); i++) res.push(i)
//   return res
// }

// rules = new Map(rules.split('\n').map(row => {
//   const [_, field, min1, max1, min2, max2] = ruleRegex.exec(row)
//   return [
//     field,
//     new Set([...expandRange(min1, max1), ...expandRange(min2, max2)])
//   ]
// }))

const valid = new Set()
const invalid = []

for (const row of rules.split('\n')) {
  const [_, field, min1, max1, min2, max2] = ruleRegex.exec(row)
  for (let i = parseInt(min1, 10); i <= parseInt(max1); i++) valid.add(i)
  for (let i = parseInt(min2, 10); i <= parseInt(max2); i++) valid.add(i)
}

otherTickets = otherTickets.split('\n')
otherTickets.shift()
otherTickets = otherTickets
  .flatMap(row => row.split(',').map(n => parseInt(n, 10)))

for (const num of otherTickets) {
  if (!valid.has(num)) invalid.push(num)
}

console.log(invalid.reduce((a, b) => a + b))
