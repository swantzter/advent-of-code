import { readFileSync } from 'fs'

let [arrival, busses] = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')

busses = busses.split(',')

let wait = +Infinity
let id

for (const bus of busses) {
  if (bus === 'X') continue
  const next = Math.ceil(arrival / bus) * bus
  if (next - arrival < wait) {
    wait = next - arrival
    id = bus
  }
}

console.log(wait * id)
