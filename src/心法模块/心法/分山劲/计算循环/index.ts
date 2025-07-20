import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
// import 北漠阵云 from './北漠阵云.json'
import 恋战 from './恋战.json'
import 血魄 from './血魄.json'
import 橙武 from './橙武.json'
// import 橙武 from './橙武.json'
// import 测试 from './测试.json'
// import 橙武测试 from './橙武测试.json'
// import 新紫武 from './新紫武.json'
// import 新奇穴2 from './新奇穴2.json'

const 计算循环: 循环数据[] = [
  恋战,
  血魄,
  橙武,
  // 橙武测试,
  // 橙武,
  // 新紫武,
] as 循环数据[]

export default 计算循环
