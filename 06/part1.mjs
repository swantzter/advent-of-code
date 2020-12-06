import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(group => {
    return new Set(group
      .replace(/\n/g, '')
      .split('')
      .filter(ch => !!ch.length)
    )
  })

let sum = 0

for (const groupAnswers of input) {
  sum += groupAnswers.size
}

console.log(sum)
