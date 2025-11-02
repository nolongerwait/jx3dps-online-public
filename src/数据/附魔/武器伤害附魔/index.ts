import { 属性类型 } from '@/@types/属性'
import { 装备部位枚举 } from '@/@types/枚举'
import { 附魔数据类型 } from '@/@types/附魔'

const 附魔数组 = [1148, 984, 856, 492, 428]

// 按顺序位置索引
const 附魔分数索引 = [2877, 2466, 2282, 1231, 1139]

export const 获取武伤附魔数据 = (主属性): 附魔数据类型[] => {
  if (主属性 === '力道' || 主属性 === '身法') {
    return 附魔数组.map((item, index) => {
      return {
        附魔名称: `武伤+${item}`,
        附魔支持部位: [装备部位枚举.武器],
        增益集合: [{ 属性: 属性类型?.武器伤害, 值: item }],
        附魔装分: 附魔分数索引[index],
      }
    })
  } else {
    return []
  }
}
