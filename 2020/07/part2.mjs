import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')
input.pop()

const containerRe = /^([\w\s]+) bags contain/i
const containedRe = /(\d+) ([\w\s]+) bags?/gi

/** @typedef {{ children: Map<string, number>, parents: Map<string, TreeEntry> }} TreeEntry */

/** @type {Map<string, TreeEntry>} */
const bags = new Map()

for (const row of input) {
  const containerName = row.match(containerRe)[1]
  const containers = [...row.matchAll(containedRe)]
    .map(([_, num, name]) => [name, parseInt(num, 10)])
  bags.set(containerName, { children: new Map(containers), parents: new Map() })
}

for (const bag of bags) {
  for (const [childName] of bag[1].children) {
    bags.get(childName).parents.set(bag[0], bag[1])
  }
}

let result = 0
const needle = 'shiny gold'

function seekDownwards (haystack) {
  for (const child of haystack.children) {
    result += child[1]
    for (let i = 0; i < child[1]; i++) {
      seekDownwards(bags.get(child[0]), child[1])
    }
  }
}

seekDownwards(bags.get(needle))

console.log(result)
