import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()
  .split('\n')

/** @param {string} str */
function first (str) {
  const indicies = [
    str.search(/\d/),
    str.indexOf('one'),
    str.indexOf('two'),
    str.indexOf('three'),
    str.indexOf('four'),
    str.indexOf('five'),
    str.indexOf('six'),
    str.indexOf('seven'),
    str.indexOf('eight'),
    str.indexOf('nine')
  ]
  const min = Math.min(...indicies.filter(i => i != -1))
  const minIdx = indicies.indexOf(min)

  if (minIdx === 0) return parseInt(str[indicies[0]], 10)
  else return minIdx
}

/** @param {string} str */
function last (str) {
  const indicies = [
    str.search(/\d[^\d]*$/),
    str.lastIndexOf('one'),
    str.lastIndexOf('two'),
    str.lastIndexOf('three'),
    str.lastIndexOf('four'),
    str.lastIndexOf('five'),
    str.lastIndexOf('six'),
    str.lastIndexOf('seven'),
    str.lastIndexOf('eight'),
    str.lastIndexOf('nine')
  ]
  const max = Math.max(...indicies.filter(i => i != -1))
  const maxIdx = indicies.indexOf(max)

  if (maxIdx === 0) return parseInt(str[indicies[0]], 10)
  else return maxIdx
}

const result = input
  .map(row => {
    return parseInt(`${first(row)}${last(row)}`, 10)
  })
  .reduce((a, b) => a + b)

console.log(result)
