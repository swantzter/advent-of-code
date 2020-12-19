import { readFileSync } from 'fs'

let [rulesInput, input] = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')

const rules = new Map()
const unprocessed = new Map()

for (const row of rulesInput = rulesInput.split('\n')) {
  let [ruleId, rest] = row.split(':')
  rest = rest.trim()
  ruleId = parseInt(ruleId, 10)

  if (rest.startsWith('"'))
    rules.set(ruleId, new RegExp('^' + rest.substr(1).slice(0, -1) + '$'))
  else {
    unprocessed.set(
      ruleId,
      rest.split(' ').map(ch => isNaN(ch) ? ch : parseInt(ch, 10))
    )
  }
}

function generateRegex (expressions, rules, unprocessed) {
  let strPattern = '^(?:' // non-capturing

  for (const exp of expressions) {
    if (exp === '|') strPattern += exp
    else if (rules.has(exp)) {
      strPattern += rules.get(exp).source.substr(1).slice(0, -1)
    } else if (unprocessed.has(exp)) {
      let result = generateRegex(unprocessed.get(exp), rules, unprocessed)
      rules.set(exp, result)
      unprocessed.delete(exp)
      strPattern += result.source.substr(1).slice(0, -1)
    } else throw new TypeError(`unknown thing ${exp}`)
  }

  strPattern += ')$'
  return new RegExp(strPattern)
}

rules.set(0, generateRegex(unprocessed.get(0), rules, unprocessed))
unprocessed.delete(0)

let matches = 0
let target = rules.get(0)
for (const row of input.split('\n')) {
  if (target.test(row)) matches++
}

console.log(matches)
