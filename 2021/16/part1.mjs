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
let packTotVers = 0
while (cur < input.length) {
  readUnknownPacket()
  console.log(packTotVers)
}

function readUnknownPacket (pad = '') {
  const packVers = readNumber(3)
  const packType = readNumber(3)

  packTotVers += packVers

  if (isNaN(packType)) {
    process.exit(1)
  }

  debug(pad, 'type', packType)
  switch (packType) {
    case 4:
      readType4(pad + ' ')
      break
    default:
      readOperator(pad + ' ')
      break
      throw TypeError(`Package type ${packType} not implemented`)
  }
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
  debug(pad, 'lenT', lenType)

  if (lenType === 0) {
    const len = readNumber(15)
    debug(pad, 'suLe', len)
    const start = cur
    while (cur < start + len) {
      readUnknownPacket(pad + ' ')
    }
  } else {
    const len = readNumber(11)
    debug(pad, 'suPa', len)
    for (let idx = 0; idx < len; idx++) {
      readUnknownPacket(pad + ' ')
    }
  }
}
