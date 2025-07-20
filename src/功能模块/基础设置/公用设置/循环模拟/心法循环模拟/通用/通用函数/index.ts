import { 选中秘籍信息 } from '@/@types/秘籍'
import { 起手Buff配置 } from '../通用框架/类型定义/Buff'
import { 每秒郭氏帧 } from '@/数据/常量'

export const 生成实际技能序列 = (list: any[]): string[] => {
  return list?.map((item) => {
    if (item?.额外信息) {
      const extraString = JSON.stringify(item?.额外信息)
      return `${item?.技能名称}${技能额外信息分隔符}${extraString}`
    } else {
      return item?.技能名称
    }
  })
}

export const 获取实际技能数据 = (item) => {
  let 实际技能名称 = item
  let 额外信息 = null
  if (item?.includes(技能额外信息分隔符)) {
    const list = item?.split(技能额外信息分隔符)

    实际技能名称 = list[0]
    try {
      额外信息 = JSON.parse(list[1])
    } catch (e) {
      console.error('e', e)
    }
  }
  return {
    实际技能名称,
    额外信息,
  }
}

export const 技能额外信息分隔符 = '%'

export const 判断有无橙武循环数据 = (循环, 大橙武启用) => {
  if (!大橙武启用) {
    return 循环.filter((item) => {
      return !item?.技能序列?.includes('触发橙武')
    })
  } else {
    return 循环
  }
}

export const 获取起手Buff配置 = (
  起手Buff配置: 起手Buff配置 | undefined,
  Buff和Dot数据,
  类型: string
) => {
  if (起手Buff配置) {
    const obj = {}
    for (const key in 起手Buff配置) {
      const data = 起手Buff配置[key]
      if (data?.类型 === 类型 && Buff和Dot数据[key]) {
        obj[key] = {
          ...Buff和Dot数据[key],
          当前层数: data?.层数,
          刷新时间: data?.获得时间,
        }
      }
    }
    return obj
  } else {
    return {}
  }
}

export const 判断秘籍减冷却 = (技能名称: string, 秘籍: 选中秘籍信息): number => {
  const 该技能秘籍 = 秘籍?.[技能名称]
  if (该技能秘籍) {
    let 总CD减少 = 0
    该技能秘籍.forEach((item) => {
      if (item?.includes('减CD')) {
        const 实际减少秒 = Number(item?.split('_')?.[1])
        if (实际减少秒 && !isNaN(实际减少秒)) {
          总CD减少 += 每秒郭氏帧 * 实际减少秒
        }
      }
    })
    return 总CD减少
  } else {
    return 0
  }
}

export const 判断秘籍减读条 = (技能名称: string, 秘籍: 选中秘籍信息): number => {
  const 该技能秘籍 = 秘籍?.[技能名称]
  if (该技能秘籍) {
    let 总CD减少 = 0
    该技能秘籍.forEach((item) => {
      if (item?.includes('减读条')) {
        const 实际减少秒 = Number(item?.split('_')?.[1])
        if (实际减少秒 && !isNaN(实际减少秒)) {
          总CD减少 += 每秒郭氏帧 * 实际减少秒
        }
      }
    })
    return 总CD减少
  } else {
    return 0
  }
}

export const 根据加速等级获取虚拟加速值 = (加速等级) => {
  const 加速等级枚举 = {
    0: 0,
    1: 206,
    2: 9232,
    3: 19285,
    4: 30158,
    5: 42057,
  }
  return 加速等级枚举[加速等级]
}
