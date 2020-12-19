import { readFileSync } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const file = './input.txt'

let [rulesInput, input] = readFileSync(file, { encoding: 'utf-8' })
  .trim()
  .split('\n\n')

let perl = '(?(DEFINE)'

for (let row of rulesInput = rulesInput.split('\n')) {
  if (row.startsWith('8:')) row = '8: 42 | 42 8'
  else if (row.startsWith('11:')) row = '11: 42 31 | 42 11 31'

  let [ruleId, rest] = row.split(':')
  rest = rest.trim()
  ruleId = parseInt(ruleId, 10)

  if (rest.startsWith('"'))
    perl += `(?<R${ruleId}>(?:${rest.substr(1).slice(0, -1)}))`
  else {
    perl += `(?<R${ruleId}>(?:`
    for (const ref of rest.split(' ')) {
      if (ref === '|') perl += ')|(?:'
      else perl += `(?&R${ref})`
    }
    perl += `))`
  }
}

perl += `)^(?&R0)$`

async function run () {
  const result = await execAsync(`perl -ne 'print if /${perl}/' ${file}`)
  return result.stdout.trim().split('\n') //.length
}

run().then(res => {
  console.log(res.length)
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
