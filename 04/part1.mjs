import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(passport => {
    const pairs = passport.split(/[\n\s]/).map(pair => {
      return pair.split(':')
    })
    return Object.fromEntries(pairs)
  })

const required = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
  // 'cid'
]

let valid = 0

for (const passport of input) {
  const keys = Object.keys(passport)

  if (required.every(key => keys.includes(key))) valid++
}

console.log(valid)
