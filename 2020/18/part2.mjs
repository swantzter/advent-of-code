import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')

function insertParenthesis (stack) {
  for (let idx = 0; idx < stack.length; idx++) {
    if (Array.isArray(stack[idx])) {
      insertParenthesis(stack[idx])
      continue
    }
    if (stack[idx] !== '+') continue

    let prev = -1
    for (let innerIdx = idx - 1; innerIdx >= 0; innerIdx--) {
      if (stack[innerIdx] === '*') {
        prev = innerIdx
        break
      }
    }
    prev += 1
    stack.splice(prev, 0, '(')

    const next = stack.findIndex((el, innerIdx, self) => (el === '*' && innerIdx > idx) || innerIdx === self.length - 1)
    stack.splice(next === stack.length - 1 ? next + 1 : next, 0, ')')

    idx++
  }
}

let sum = 0
for (const row of input) {
  let stack = []
  let parents = []
  let cursor = stack
  let remainder = row

  while (remainder.length) {
    let idx = remainder.search(/([\s()]|$)/)
    let sep = remainder[idx]
    let token = remainder.substr(0, idx)
    remainder = remainder.substr(idx + 1)
    if (sep === '(') {
      let child = [sep] // ['(']
      cursor.push(child)
      parents.push(cursor)
      cursor = child
      continue
    }
    if (token !== '') cursor.push(token)
    if (sep === ')') {
      cursor.push(sep)
      cursor = parents.pop()
      continue
    }
  }

  insertParenthesis(stack)
  sum += eval(stack.flat(Infinity).join(''))
}

console.log(sum)
