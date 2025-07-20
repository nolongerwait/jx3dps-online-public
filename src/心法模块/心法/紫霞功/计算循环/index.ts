import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 紫武 from './紫武.json'
import 腾空 from './腾空.json'
import 橙武常规 from './橙武常规.json'

const 计算循环: 循环数据[] = [
  // 测试循环,
  // 紫武3分钟,
  紫武,
  腾空,
  // 紫武赶轴,
  // 紫气对轴流,
  // 小孩流,
  橙武常规,
  // 橙武,
  // 橙武,
] as 循环数据[]

export default 计算循环
