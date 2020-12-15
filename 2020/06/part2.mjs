import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(group => group.split('\n').map(person => new Set(person)))

// trailing \n
input[input.length - 1].pop()

let sum = 0

// I knew MDN had an example of Set intersections :3
function intersection (setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}


for (const groupAnswers of input) {
  sum += groupAnswers.reduce(intersection).size
}

console.log(sum)
