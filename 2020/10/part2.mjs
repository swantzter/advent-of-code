import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(n => parseInt(n, 10))
  .sort((a, b) => a - b)
input.pop()

const routesToMax = {}
routesToMax[input[input.length - 1]] = 1 // max has one way to reach the end
for (let i = input.length - 2; i >= 0; i--) {
  const val = input[i]
  routesToMax[val] = 0
  for (let k = val + 1; k <= val + 3; k++) {
    // if there was a way to reach max from val+[1,2,3]
    // there will be as many ways as the sum of the routes from val+[1,2,3]
    // to max
    if (routesToMax[k]) routesToMax[val] += routesToMax[k] ?? 0
  }
}

console.log(
  // we can only go 1, 2, or 3 from 0
  (routesToMax['1'] ?? 0) +
  (routesToMax['2'] ?? 0) +
  (routesToMax['3'] ?? 0)
)
