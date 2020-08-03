import { Minterm } from './minterm'

export * from './minterm'

const test = new Minterm('0000')
console.log(test)

console.log(test.getNeighborTerms([0, 1, 2, 3]))
