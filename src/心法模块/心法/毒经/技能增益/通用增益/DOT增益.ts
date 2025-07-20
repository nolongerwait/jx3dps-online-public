import { 属性类型 } from '@/@types/属性'
import { 技能增益列表类型 } from '@/@types/技能'

const DOT增益: 技能增益列表类型[] = [
  {
    // 6629
    增益名称: '黯影',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.系数增伤, 值: 1.25 }],
  },
]

export default DOT增益
