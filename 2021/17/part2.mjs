import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const targetRe = /x=(?<xmin>[+-]?\d+)..(?<xmax>[+-]?\d+),\s+y=(?<ymin>[+-]?\d+)..(?<ymax>[+-]?\d+)/

let target = targetRe.exec(input).groups
target = Object.fromEntries(Object.entries(target).map(([k, v]) => [k, parseInt(v, 10)]))

const trajectories = []

for (let ivx = 0; ivx <= target.xmax; ivx++) {
  for (let ivy = 100; ivy >= target.ymin; ivy--) {
    let x = 0, y = 0
    let vx = ivx, vy = ivy

    while (y >= target.ymin) {
      x += vx
      y += vy
      vy -= 1
      switch (Math.sign(vx)) {
        case -1:
          vx += 1
          break
        case 1:
          vx -= 1
          break
      }

      if (
        x >= target.xmin && x <= target.xmax &&
        y >= target.ymin && y <= target.ymax
      ) {
        trajectories.push({ vx: ivx, vy: ivy })
        break
      }
    }
  }
}

console.log(trajectories.length)
