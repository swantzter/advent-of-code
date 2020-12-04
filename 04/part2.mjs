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

const hclRegex = /^#[0-9a-f]{6}$/i
const pidRegex = /^[0-9]{9}$/
const validEcls = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

for (const passport of input) {
  const keys = Object.keys(passport)

  if (
    required.every(key => keys.includes(key)) &&
    passport.byr.length === 4 && Number(passport.byr) >= 1920 && Number(passport.byr) <= 2002 &&
    passport.byr.length === 4 && Number(passport.iyr) >= 2010 && Number(passport.iyr) <= 2020 &&
    passport.byr.length === 4 && Number(passport.eyr) >= 2020 && Number(passport.eyr) <= 2030 &&
    (
      passport.hgt.includes('in')
        ? parseInt(passport.hgt, 10) >= 59 && parseInt(passport.hgt, 10) <= 76
        : parseInt(passport.hgt, 10) >= 150 && parseInt(passport.hgt, 10) <= 193
    ) &&
    hclRegex.test(passport.hcl) &&
    validEcls.includes(passport.ecl) &&
    pidRegex.test(passport.pid)
  ) valid++
}

console.log(valid)
