import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map(ins => [ins.substr(0, 1), parseInt(ins.substr(1), 10)])

const boat = {
  x: 0,
  y: 0
}

let waypoint = {
  x: 10,
  y: 1
}

function rotate ({ x, y }, deg) {
  const radians = (Math.PI / 180) * deg
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)

  return {
    x: Math.round((cos * x) + (sin * y)),
    y: Math.round((cos * y) - (sin * x))
  }
}

for (let [ins, param] of input) {
  if (ins === 'F') {
    boat.x += waypoint.x * param
    boat.y += waypoint.y * param
  }
  else if (ins === 'N') waypoint.y += param
  else if (ins === 'S') waypoint.y -= param
  else if (ins === 'E') waypoint.x += param
  else if (ins === 'W') waypoint.x -= param
  else if (ins === 'R') waypoint = rotate(waypoint, param)
  else if (ins === 'L') waypoint = rotate(waypoint, -param)
}

console.log(Math.abs(boat.x) + Math.abs(boat.y))
