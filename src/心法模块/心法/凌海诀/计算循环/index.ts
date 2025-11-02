import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 紫武_风驰 from './紫武_风驰.json'
import 紫武_怒翼 from './紫武_怒翼.json'
import 橙武_风驰 from './橙武_风驰.json'
// import 羽彰海碧 from './羽彰海碧.json'
// import 驾鸾藏锋 from './驾鸾藏锋.json'
// import 猴王倾波 from './猴王倾波.json'
// import 驾鸾藏锋_雪海 from './驾鸾藏锋_雪海.json'
// import 橙武_羽彰海碧 from './橙武_羽彰海碧.json'
// import 橙武_驾鸾藏锋 from './橙武_驾鸾藏锋.json'
// import 橙武_驾鸾藏锋_极限 from './橙武_驾鸾藏锋_极限.json'

const 计算循环: 循环数据[] = [
  紫武_风驰,
  紫武_怒翼,
  橙武_风驰,
  // 橙武_羽彰海碧,
  // 驾鸾藏锋,
  // 橙武_驾鸾藏锋,
  // 橙武_驾鸾藏锋_极限,
  // 猴王倾波,
  // 驾鸾藏锋_雪海,
] as 循环数据[]

export default 计算循环
