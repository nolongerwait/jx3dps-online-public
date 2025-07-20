// import { 每秒郭氏帧 } from '@/数据/常量'
import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型, DotDTO } from './type'

export const 根据奇穴修改buff数据 = (奇穴: string[]) => {
  const res = {}
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  Object.keys(原始Buff数据).forEach((key) => {
    const obj = 原始Buff数据[key]
    switch (key) {
      case '振翅图南':
        if (判断奇穴('驰行')) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 20
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 10
        } else {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 12
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 6
        }
        break
      case '驰风震域':
        if (判断奇穴('梦悠')) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 40
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 10
        } else {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 24
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 6
        }
        break
      case '驰风震域·海碧':
        if (判断奇穴('梦悠')) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 32
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 8
        } else {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ; (obj as DotDTO).最大作用次数 = 16
            ; (obj as DotDTO).最大持续时间 = 每秒郭氏帧 * 4
        }
        break
      default:
        break
    }
    res[key] = obj
  })

  return res
}

export const 根据奇穴秘籍修改技能数据 = (奇穴: string[]): 循环基础技能数据类型[] => {
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  const res: 循环基础技能数据类型[] = 循环模拟技能基础数据.map((技能) => {
    if (技能?.技能名称 === '振翅图南') {
      return 判断奇穴('驾鸾')
        ? {
          ...技能,
          最大充能层数: 2,
          技能CD: 每秒郭氏帧 * 25,
        }
        : 技能
    } else if (技能?.技能名称 === '浮游天地') {
      return 判断奇穴('藏锋')
        ? {
          ...技能,
          最大充能层数: 2,
        }
        : 技能
    } else if (技能?.技能名称 === '跃潮斩波') {
      let 技能原始CD = 技能.技能CD || 0
      if (判断奇穴('潮音')) {
        技能原始CD = 技能原始CD - 每秒郭氏帧 * 3
      }
      return {
        ...技能,
        技能CD: 技能原始CD,
      }
    } else if (技能?.技能名称 === '海运南冥') {
      return 判断奇穴('澄穆')
        ? { ...技能, 技能CD: 每秒郭氏帧 * 4 }
        : { ...技能, 技能CD: 每秒郭氏帧 * 5 }
    } else if (技能?.技能名称 === '溟海御波') {
      let 技能原始CD = 技能.技能CD || 0
      let 最大充能层数 = 技能.最大充能层数 || 1
      if (判断奇穴('澄穆')) {
        技能原始CD = 技能原始CD - 每秒郭氏帧 * 1
      }
      if (判断奇穴('遥思')) {
        最大充能层数 = 2
      }
      return {
        ...技能,
        技能CD: 技能原始CD,
        最大充能层数
      }
    } else {
      return 技能
    }
  })

  return res
}

export const ERROR_ACTION = {
  体态错误: {
    信息: '当前体态错误',
  },
  充能不足: {
    信息: '当前技能没有可释放层数',
  },
  BUFF错误: {
    信息: '当前没有对应的BUFF',
  },
}

export const 转化buff和增益名称 = (增益名称, buff列表) => {
  return buff列表?.[增益名称]
}
