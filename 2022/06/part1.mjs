import { readFileSync } from 'node:fs'
import { join as pjoin } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

// Let's do this the lazy, unoptimised way!!!
let result
for (let idx = 0; idx < input.length; idx++) {
  const chars = new Set([
    input[idx],
    input[idx + 1],
    input[idx + 2],
    input[idx + 3],
  ])

  if (chars.size === 4) {
    result = idx + 4
    break
  }
}

console.log(result)
