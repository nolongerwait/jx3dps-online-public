import { 属性类型 } from '@/@types/属性'
import { 装备部位枚举 } from '@/@types/枚举'
import { 附魔数据类型 } from '@/@types/附魔'

const 附魔数组 = [10443, 5222]

// 按顺序位置索引
const 附魔分数索引 = [2282, 1139]

export const 获取气血附魔数据 = (): 附魔数据类型[] => {
  return 附魔数组.map((item, index) => {
    return {
      附魔名称: `气血+${item}`,
      附魔支持部位: [装备部位枚举.衣服, 装备部位枚举.腰带],
      增益集合: [{ 属性: 属性类型?.基础气血上限, 值: item }],
      附魔装分: 附魔分数索引[index],
    }
  })
}
