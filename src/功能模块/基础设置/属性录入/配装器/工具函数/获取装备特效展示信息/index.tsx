import { 副本精简特效枚举, 装备特效枚举, 试炼之地特效枚举 } from '@/@types/装备'
import 特效描述 from './data.json'
import {
  获取副本特效增益表现,
  获取试炼之地增益表现,
} from '../根据装备信息获取基础属性/装备特效判断'

export const 获取装备特效展示信息 = (
  特效名称: 装备特效枚举,
  装备品级: number,
  装备特效等级: any,
) => {
  const 描述 = 特效描述?.[特效名称]
  if (!描述) {
    return ''
  }
  let 特效等级 = 1
  if (试炼之地特效枚举?.[特效名称]) {
    // 判断试炼之地特效
    特效等级 = 获取试炼之地增益表现(装备品级, 装备特效等级)
  } else if (副本精简特效枚举?.[特效名称]) {
    特效等级 = 获取副本特效增益表现(装备品级, 装备特效等级)
  }
  const 最终描述 = 获取该等级实际描述(描述, 特效等级)
  return 最终描述
}

const 获取该等级实际描述 = (描述, 特效等级: number) => {
  const 安全等级 = Math.max(特效等级 - 1, 0)
  let desc = 描述?.描述
  // 使用正则表达式替换所有【数值_x】占位符
  desc = desc.replace(/数值_(\d+)/g, (match, num) => {
    const 等级索引 = `数值_${num}`
    const 数值数组 = 描述[等级索引]

    // 处理特殊数值格式（如"33|30"）
    if (数值数组 && 数值数组[安全等级]) {
      return Array.isArray(数值数组[安全等级])
        ? 数值数组[安全等级].join('|')
        : 数值数组[安全等级].toString()
    }

    return match // 保留未找到的占位符
  })

  return desc
}
