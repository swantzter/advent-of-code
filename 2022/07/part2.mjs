import { readFileSync } from 'node:fs'
import { join as pjoin, sep } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const input = readFileSync(process.argv[2] ? pjoin(process.cwd(), process.argv[2]) : pjoin(__dirname, './input.txt'), { encoding: 'utf-8' }).trim()

const rows = input.split('\n')

const tree = {}
let currentDir = tree
const dirSizes = {}
let path = ''

for (const row of rows) {
  if (row.startsWith('$ cd')) {
    path = pjoin(path, row.substring(5))

    currentDir = tree
    let pathParts = path.split(sep).filter(p => p !== '')
    for (const pathSeg of pathParts) {
      currentDir = currentDir[pathSeg]
    }
  } else if (row.startsWith('$ ls')) {
    continue
  } else if (row.startsWith('dir')) {
    currentDir[row.substring(4)] ??= {}
  } else if (/^\d+/.test(row)) {
    const size = parseInt(row.split(' ')[0], 10)
    const fileName = row.split(' ')[1]
    if (currentDir[fileName] != null) continue

    currentDir[fileName] = size

    let pathParts = path === sep ? [''] : path.split(sep)
    while (pathParts.length > 0) {
      dirSizes[pjoin(...pathParts)] ??= 0
      dirSizes[pjoin(...pathParts)] += size
      pathParts.pop()
    }
  }
}

const fsMax = 70000000
const neededFree = 30000000

const currentFree = fsMax - dirSizes['.']
const needsFreeing = neededFree - currentFree

const dirToFree = Math.min(...Object.values(dirSizes).filter(s => s > needsFreeing))

console.log(dirToFree)
