export function decreaseArray(originalValue, targetValue, decrementValue, arrLength) {
  // 创建一个初始数组
  const arr = new Array(arrLength).fill(originalValue)
  // 从最后一位开始，依次向前减1，直到减完n次
  let index = arrLength - 1

  let decrement = decrementValue

  while (decrement > 0 && arr[0] > targetValue) {
    // 如果当前索引有效且当前值大于目标值
    if (arr[index] > targetValue) {
      arr[index] -= 1 // 减1
      decrement-- // 减少decrementValue
    }

    // 向前移动索引
    index--

    // 如果当前索引小于0，重置为最后一位
    if (index < 0) {
      index = arrLength - 1 // 重置索引
    }
  }

  return arr
}
