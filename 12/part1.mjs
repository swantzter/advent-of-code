import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map(ins => [ins.substr(0, 1), parseInt(ins.substr(1), 10)])

const boat = {
  x: 0,
  y: 0,
  dir: 'E'
}

const rotations = ['N', 'E', 'S', 'W']
const rotate = (curr, dir) => {
  const idx = (rotations.indexOf(curr) + dir) % rotations.length
  return rotations[idx < 0 ? rotations.length + idx : idx]
}

for (let [ins, param] of input) {
  if (ins === 'R') {
    boat.dir = rotate(boat.dir, param / 90)
    continue
  }
  else if (ins === 'L') {
    boat.dir = rotate(boat.dir, -1 * (param / 90))
    continue
  }

  if (ins === 'F') ins = boat.dir // lol modifying parameters

  if (ins === 'N') boat.y += param
  else if (ins === 'S') boat.y -= param
  else if (ins === 'E') boat.x += param
  else if (ins === 'W') boat.x -= param
}

console.log(Math.abs(boat.x) + Math.abs(boat.y))
