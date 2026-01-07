export const insertAt = (arr: any[], index: number, newItem: any) => {
  return [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
  ]
}