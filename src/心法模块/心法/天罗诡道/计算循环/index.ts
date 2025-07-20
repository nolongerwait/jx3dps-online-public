import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
// import 测试循环 from './测试循环.json'
import 紫武_千机云奔 from './紫武_千机云奔.json'
import 紫武_千秋化血 from './紫武_千秋化血.json'
import 紫武_千秋化血_等鬼斧 from './紫武_千秋化血_等鬼斧.json'
import 紫武_千秋毒刹 from './紫武_千秋毒刹.json'
import 紫武_千秋毒刹_一键宏 from './紫武_千秋毒刹_一键宏.json'
import 橙武_千机云奔 from './橙武_千机云奔.json'
import 橙武_千秋化血 from './橙武_千秋化血.json'
import 橙武_千秋化血_等鬼斧 from './橙武_千秋化血_等鬼斧.json'
// import 橙武加速测试 from './橙武加速测试.json'

const 计算循环: 循环数据[] = [
  紫武_千秋化血,
  紫武_千秋化血_等鬼斧,
  紫武_千机云奔,
  紫武_千秋毒刹,
  紫武_千秋毒刹_一键宏,
  橙武_千秋化血,
  橙武_千秋化血_等鬼斧,
  橙武_千机云奔,
  // 橙武,
] as 循环数据[]

export default 计算循环
