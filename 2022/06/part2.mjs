import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

// Let's do this the lazy, unoptimised way!!!
const LEN = 14
let result
for (let idx = 0; idx < input.length; idx++) {
  const chars = new Set(input.slice(idx, idx + LEN))

  if (chars.size === LEN) {
    result = idx + LEN
    break
  }
}

console.log(result)
