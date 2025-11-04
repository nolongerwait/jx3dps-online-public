import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// import 测试 from './测试.json'
import 橙武_神阳 from './橙武_神阳.json'
import 紫武_滃胧_四段 from './紫武_滃胧_四段.json'
import 紫武_启风_四段 from './紫武_启风_四段.json'

const 计算循环: 循环数据[] = [
  // 测试,
  橙武_神阳,
  紫武_滃胧_四段,
  紫武_启风_四段,
] as 循环数据[]

export default 计算循环
