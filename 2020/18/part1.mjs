import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')

const ops = {
  '*': (arg1, arg2) => arg1 * arg2,
  '+': (arg1, arg2) => arg1 + arg2,
}

function calcParenthesis (stack) {
  while (stack.length > 1) {
    if (Array.isArray(stack[0])) stack[0] = calcParenthesis(stack[0])
    if (Array.isArray(stack[1])) stack[1] = calcParenthesis(stack[1])
    if (Array.isArray(stack[2])) stack[2] = calcParenthesis(stack[2])

    if (stack[1] in ops) {
      let arg1 = stack.shift()
      let op = stack.shift()
      let arg2 = stack.shift()
      stack.unshift(ops[op](arg1, arg2))
    }
  }
  return stack[0]
}

let sum = 0
const numeric = /^\d+$/
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
      let child = []
      cursor.push(child)
      parents.push(cursor)
      cursor = child
      continue
    }
    if (token !== '') cursor.push(numeric.test(token) ? parseInt(token, 10) : token)
    if (sep === ')') {
      cursor = parents.pop()
      continue
    }
  }

  sum += calcParenthesis(stack)
}

console.log(sum)
