import { insertIntoString, xor, range } from './helpers'
import * as rp from './representations'

const generateMasks = (numOfTerms: number, fixedIndicies: number[] = []): boolean[][] => {
  const numOfNeighbors = Math.pow(2, numOfTerms) - 1
  const masks = range(1, numOfNeighbors)
    .map(num => rp.convertDecimalToBinaryString(num, numOfTerms))
    .map(binaryString => {
      let maskStr = binaryString
      fixedIndicies.forEach(index => { maskStr = insertIntoString(maskStr, index, '0') })
      return maskStr
    }).map(rp.convertBinaryStringToBooleanArray)
  return masks
}

const generateFixedIndicies = (numOfTerms: number): number[][] => {
  const fixedIndiciesList = generateMasks(numOfTerms)
    .map(mask => {
      const indicies = range(0, numOfTerms)
      mask.forEach((bool, idx) => {
        if (!bool) indicies[idx] = -1
      })
      return indicies.filter(x => x !== -1)
    })
  return fixedIndiciesList.sort((a, b) => a.length - b.length)
}

const throwIfFixedIndiciesInvalid = (fixedIndicies: number[], maxIndex: number): void | never => {
  const repeatCheckSet = new Set()
  fixedIndicies.forEach(fixedIndex => {
    if (repeatCheckSet.has(fixedIndex)) throw new Error(`Fixed index ${fixedIndex} is repeated`)
    if (fixedIndex < 0 || fixedIndex >= maxIndex) throw new RangeError(`Fixed index ${fixedIndex} is not within range`)
    repeatCheckSet.add(fixedIndex)
  })
}

export class Minterm {
  public readonly isDontCare: boolean = false
  public readonly terms: boolean[]

  constructor (terms: boolean[] | string, isDontCare: boolean = false) {
    if (typeof terms === 'string') {
      this.terms = [...terms].map(letter => letter === '1')
    } else {
      this.terms = terms
    }
    this.isDontCare = isDontCare
  }

  /* Returns all neighboring minterms where each term is flipped except the fixed terms (specified by its index) */
  getNeighborTerms (fixedIndicies = []): string[] {
    throwIfFixedIndiciesInvalid(fixedIndicies, this.terms.length)
    const numOfFreeTerms = this.terms.length - fixedIndicies.length
    const permutationMasks = generateMasks(numOfFreeTerms, fixedIndicies)
    const neighbors = permutationMasks
      .map(mask => xor(mask, this.terms))
      .map(neighbor => rp.convertBooleanArrayToBinaryString(neighbor))
    return neighbors
  }

  get length () {
    return this.terms.length
  }

  get binaryString () {
    return rp.convertBooleanArrayToBinaryString(this.terms)
  }

  get decimal () {
    return parseInt(this.binaryString, 2)
  }
}
