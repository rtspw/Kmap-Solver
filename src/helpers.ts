export const range = (start: number, length: number): number[] => {
  return [...Array(length).keys()].map(n => n + start)
}

export const xor = (arr1: boolean[], arr2: boolean[]): boolean[] => {
  const outputLength = Math.min(arr1.length, arr2.length)
  const outputArr = []
  for (let i = 0; i < outputLength; i++) {
    outputArr.push((arr1[i] && !arr2[i]) || (!arr1[i] && arr2[i]))
  }
  return outputArr
}

export const insertIntoString = (string: string, index: number, text: string) => {
  return string.slice(0, index) + text + string.slice(index)
}
