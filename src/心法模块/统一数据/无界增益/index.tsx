import { 属性类型 } from '@/心法模块/模块工具/常量'
import { 技能增益列表类型 } from '@/@types/技能'
import { 按数字生成数组 } from '@/心法模块/模块工具/按数字生成数组'
import * as 通用会心 from './通用会心'
import * as 通用增伤 from './通用增伤'
import * as 通用无双 from './通用无双'
import * as 通用易伤 from './通用易伤'

const 无界通用大橙武增伤函数 = () => {
  const 数组 = 按数字生成数组(5)
  // 70161
  return 数组.map((item) => {
    return {
      增益名称: `大橙武增伤·${item}`,
      增益所在位置: '技能',
      增益类型: '部分启用',
      增益集合: [{ 属性: 属性类型.通用增伤, 值: (154 * item) / 1024 }],
    } as 技能增益列表类型
  })
}

const 无界通用增益 = {
  无界通用大橙武增伤函数,
  ...通用会心,
  ...通用增伤,
  ...通用无双,
  ...通用易伤,
}

export default 无界通用增益
