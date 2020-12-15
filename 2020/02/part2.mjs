import { readFileSync } from 'fs'

const polRegEx = /(\d+)-(\d+)\s([a-z]):\s([a-z]*)/i

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(row => {
    const result = polRegEx.exec(row)
    if (!result) return null
    return {
      pos1: parseInt(result[1], 10) - 1,
      pos2: parseInt(result[2], 10) - 1,
      char: result[3],
      password: result[4]
    }
  })
  .filter(res => !!res)

const valids = []

const xor = (a, b) => a ? !b : b

for (const password of input) {
  if (xor(
    password.password[password.pos1] === password.char,
    password.password[password.pos2] === password.char
  )) {
    valids.push(password)
  }
}

console.log(valids.length)
