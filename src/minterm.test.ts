import { Minterm } from './minterm'

describe('Basic functionality', () => {
  test('Construction and Properties', () => {
    const minterm1 = new Minterm('010101')
    expect(minterm1.length).toBe(6)
    expect(minterm1.isDontCare).toBe(false)
    expect(minterm1.decimal).toBe(21)
    expect(minterm1.binaryString).toBe('010101')
    expect(minterm1.terms).toEqual([false, true, false, true, false, true])
    const minterm2 = new Minterm('000', true)
    expect(minterm2.length).toBe(3)
    expect(minterm2.isDontCare).toBe(true)
    expect(minterm2.decimal).toBe(0)
    expect(minterm2.binaryString).toBe('000')
    expect(minterm2.terms).toEqual([false, false, false])
  })
  test('Get Neighbors Error Handling', () => {
    const minterm = new Minterm('000')
    expect(() => minterm.getNeighborTerms([0, 0])).toThrow('repeat')
    expect(() => minterm.getNeighborTerms([0, 1, 5])).toThrow('range')
  })
  test('Get Neighbors Functionality', () => {
    const minterm = new Minterm('101')
    expect(minterm.getNeighborTerms([0, 1])).toEqual(['100'])
    expect(minterm.getNeighborTerms([0]).sort()).toEqual(['100', '111', '110'].sort())
    expect(minterm.getNeighborTerms().sort()).toEqual(['001', '111', '100', '011', '000', '110', '010'].sort())
  })
})
