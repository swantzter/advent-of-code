import { readFileSync } from 'fs'

const polRegEx = /(\d+)-(\d+)\s([a-z]):\s([a-z]*)/i

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(row => {
    const result = polRegEx.exec(row)
    if (!result) return null
    return {
      min: parseInt(result[1], 10),
      max: parseInt(result[2], 10),
      char: result[3],
      password: result[4].split('')
    }
  })
  .filter(res => !!res)

const valids = []

for (const password of input) {
  const occurrences = password.password.filter(char => char === password.char).length

  if (occurrences >= password.min && occurrences <= password.max) {
    valids.push(password)
  }
}

console.log(valids.length)
