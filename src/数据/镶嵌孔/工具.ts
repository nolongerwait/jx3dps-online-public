import type { 主属性类型, 功法类型 } from '@/心法模块/interface'
import 镶嵌孔数据 from './index'
import { 属性类型 } from '@/@types/属性'

export const 获取当前心法对应镶嵌孔数据 = (功法: 功法类型, 主属性: 主属性类型) => {
  let 数据 = 镶嵌孔数据

  // 过滤内外功攻击
  if (功法 === '内功' || 功法 === '天罗诡道') {
    数据 = 数据.filter((item) => {
      return item?.镶嵌类型 !== 属性类型.外功基础攻击
    })
  } else if (功法 === '外功') {
    数据 = 数据.filter((item) => {
      return item?.镶嵌类型 !== 属性类型.内功基础攻击
    })
  }

  // 过滤出主属性
  数据 = 数据.filter((item) => {
    if (['力道', '身法', '根骨', '元气']?.includes(item?.镶嵌类型)) {
      return item?.镶嵌类型 === 属性类型?.[主属性]
    } else {
      return true
    }
  })

  return 数据
}

export const 获取镶嵌孔基础系数 = (level) => {
  if (level > 6) {
    return (level * 0.65 - 3.2) * 1.3
  } else {
    return level * 0.195
  }
}

export const 获取镶嵌具体数值 = (level, base) => {
  return Math.floor(获取镶嵌孔基础系数(level) * base)
}
