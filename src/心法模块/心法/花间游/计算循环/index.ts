import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 紫武 from './紫武.json'
// import 大笛子 from './大笛子.json'
import 橙武 from './橙武.json'
// import 手动焚玉60延迟 from './手动焚玉60延迟.json'
// import 橙武 from './橙武.json'
// import 橙武定式黑白 from './橙武定式黑白.json'
// import 一键宏焚玉 from './一键宏焚玉.json'
// import 一键宏青歌 from './一键宏青歌.json'
// import 测试循环 from './测试循环.json'

const 计算循环: 循环数据[] = [
  紫武,
  // 大笛子,
  橙武,
  // 手动焚玉60延迟,
  // 一键宏焚玉,
  // 橙武,
  // 橙武定式黑白,
] as 循环数据[]

export default 计算循环
