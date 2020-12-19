import { readFileSync } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const file = './input.txt'

let [rulesInput, input] = readFileSync(file, { encoding: 'utf-8' })
  .trim()
  .split('\n\n')

const rules = new Map()
const unprocessed = new Map()

for (let row of rulesInput = rulesInput.split('\n')) {
  if (row.startsWith('8:')) row = '8: 42 | 42 8'
  else if (row.startsWith('11:')) row = '11: 42 31 | 42 11 31'

  let [ruleId, rest] = row.split(':')
  rest = rest.trim()
  ruleId = parseInt(ruleId, 10)

  if (rest.startsWith('"'))
    rules.set(ruleId, rest.substr(1).slice(0, -1))
  else {
    unprocessed.set(
      ruleId,
      rest.split(' ').map(ch => isNaN(ch) ? ch : parseInt(ch, 10))
    )
  }
}

function generateRegex (id, expressions, rules, unprocessed) {
  let strPattern = '(?:' // non-capturing
  let suffix = ''

  console.log(id, expressions)

  if (expressions.includes('|')) {
    strPattern += generateRegex(
      id, expressions.slice(0, expressions.indexOf('|')), rules, unprocessed
    )
    strPattern += '|'

    if (expressions[expressions.length - 1] === id) {
      suffix = '+'
      expressions.pop()
    }

    strPattern += generateRegex(
      id, expressions.slice(expressions.indexOf('|') + 1), rules, unprocessed
    )
  } else {
    for (const exp of expressions) {
      if (id === exp) {
      strPattern += ')(?R)(?:'
      } else if (rules.has(exp)) {
        strPattern += rules.get(exp)
      } else if (unprocessed.has(exp)) {
        strPattern += generateRegex(exp, unprocessed.get(exp), rules, unprocessed)
      } else throw new TypeError(`unknown thing ${exp}`)
    }
  }

  strPattern += `)${suffix}`
  rules.set(id, strPattern)
  unprocessed.delete(id)
  return strPattern
}

rules.set(0, generateRegex(0, unprocessed.get(0), rules, unprocessed))
unprocessed.delete(0)
console.log(rules.get(0))

async function run () {
  const target = rules.get(0)
  const result = await execAsync(`perl -ne 'print if /^${target}$/' ${file}`)
  return result.stdout.trim().split('\n') //.length
}

run().then(res => {
  console.log(res)
  console.log(res.length)
  process.exit(0)
})
