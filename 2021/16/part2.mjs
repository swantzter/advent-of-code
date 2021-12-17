import { readFileSync } from 'fs'
import { join as pjoin } from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

function debug (...args) {
  if (!process.env.DEBUG) return
  console.log(...args)
}

let bin = ''

for (let idx = 0; idx < input.length; idx++) {
  bin += parseInt(input[idx], 16).toString(2).padStart(4, '0')
}

let cur = 0
while (cur < input.length) {
  console.log(readUnknownPacket())
}

function readUnknownPacket (pad = '') {
  const packVers = readNumber(3)
  const packType = readNumber(3)

  if (isNaN(packType)) {
    process.exit(1)
  }

  debug(pad, 'type', packType)

  let res
  if ([0, 1, 2, 3, 5, 6, 7].includes(packType)) {
    res = readOperator(pad + ' ')
  }

  switch (packType) {
    case 0:
      debug(pad, 'addi', ...res)
      res = res.reduce((a, b) => a + b, 0)
      break
    case 1:
      debug(pad, 'mult', ...res)
      res = res.reduce((a, b) => a * b, 1)
      break
    case 2:
      debug(pad, 'mini', ...res)
      res = Math.min(...res)
      break
    case 3:
      debug(pad, 'maxi', ...res)
      res = Math.max(...res)
      break
    case 4:
      res = readType4(pad + ' ')
      debug(pad, 'lite', res)
      break
    case 5:
      debug(pad, 'grea', ...res)
      res = res.shift() > res.shift() ? 1 : 0
      break
    case 6:
      debug(pad, 'less', ...res)
      res = res.shift() < res.shift() ? 1 : 0
      break
    case 7:
      debug(pad, 'equa', ...res)
      res = res.shift() === res.shift() ? 1 : 0
      break
    default:
      throw TypeError(`Package type ${packType} not implemented`)
  }

  return res
}

function readType4 (pad) {
  let stop = false
  let num = ''
  while (!stop) {
    stop = readNumber(1) === 0
    num += readNumber(4, false)
  }
  num = parseInt(num, 2)
  debug(pad, 'valu', num)
  return num
}

function readNumber (bits, convert = true) {
  let num = bin.substring(cur, cur + bits)
  cur += bits
  return convert ? parseInt(num, 2) : num
}

function readOperator (pad) {
  const lenType = readNumber(1)
  const subPackets = []
  debug(pad, 'lenT', lenType)

  if (lenType === 0) {
    const len = readNumber(15)
    debug(pad, 'suLe', len)
    const start = cur
    while (cur < start + len) {
      subPackets.push(readUnknownPacket(pad + ' '))
    }
  } else {
    const len = readNumber(11)
    debug(pad, 'suPa', len)
    for (let idx = 0; idx < len; idx++) {
      subPackets.push(readUnknownPacket(pad + ' '))
    }
  }

  return subPackets
}
