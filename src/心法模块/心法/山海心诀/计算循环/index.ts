import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
// import 测试 from './测试.json'
import 紫武_聚势 from './紫武_聚势.json'
import 紫武_聚势_审固 from './紫武_聚势_审固.json'
import 橙武_聚势 from './橙武_聚势.json'

const 计算循环: 循环数据[] = [紫武_聚势, 紫武_聚势_审固, 橙武_聚势]

export default 计算循环
