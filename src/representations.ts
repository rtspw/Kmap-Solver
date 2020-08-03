export const convertDecimalToBinaryString = (num: number, padding: number = 0): string => {
  return num.toString(2).padStart(padding, '0')
}

export const convertBinaryStringToBooleanArray = (binaryString: string): boolean[] => {
  return binaryString.split('').map(x => x === '1')
}

export const convertBooleanArrayToBinaryString = (arr: boolean[]): string => {
  return arr.map(term => term === true ? '1' : '0').join('')
}
