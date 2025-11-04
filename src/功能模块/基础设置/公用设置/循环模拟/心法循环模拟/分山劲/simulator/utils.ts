import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型 } from './type'
import { 选中秘籍信息 } from '@/@types/秘籍'
import { 判断秘籍减冷却 } from '../../通用/通用函数'

export const 根据奇穴秘籍修改buff数据 = (
  奇穴: string[],
  秘籍信息: 选中秘籍信息,
  // 加速值: number,
) => {
  const res = {}
  // const 判断奇穴 = (val) => {
  //   return 奇穴?.includes(val)
  // }

  Object.keys(原始Buff数据).forEach((key) => {
    const obj = 原始Buff数据[key]
    let 血怒总持续时间延长: number = 0
    let 盾飞总持续时间延长: number = 0

    switch (key) {
      case '血怒_惊涌':
        if (秘籍信息?.['血怒']?.length) {
          for (let i = 0; i < 秘籍信息['血怒'].length; i++) {
            if (秘籍信息['血怒'][i]?.includes('持续')) {
              血怒总持续时间延长 += 1
            }
          }
        }
        if (秘籍信息?.['血怒']) {
          obj.最大持续时间 = 每秒郭氏帧 * (10 + 血怒总持续时间延长)
        } else {
          obj.最大持续时间 = 每秒郭氏帧 * 10
        }
        break
      case '盾飞':
        if (秘籍信息?.['盾飞']?.length) {
          for (let i = 0; i < 秘籍信息['盾飞'].length; i++) {
            if (秘籍信息['盾飞'][i]?.includes('持续')) {
              盾飞总持续时间延长 += 5
            }
          }
        }
        if (秘籍信息?.['盾飞']) {
          obj.最大持续时间 = 每秒郭氏帧 * (15 + 盾飞总持续时间延长)
        } else {
          obj.最大持续时间 = 每秒郭氏帧 * 15
        }
        break
      default:
        break
    }
    res[key] = obj
  })

  return res
}

export const 根据奇穴秘籍修改技能数据 = (
  奇穴: string[],
  秘籍: 选中秘籍信息,
): 循环基础技能数据类型[] => {
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  const res: 循环基础技能数据类型[] = 循环模拟技能基础数据.map((技能) => {
    if (技能?.技能名称 === '横') {
      let 技能原始CD = 技能.技能CD || 0
      let 最大充能层数 = 技能?.最大充能层数 || 1
      if (判断奇穴('涣衍')) {
        技能原始CD = 技能原始CD - 每秒郭氏帧 * 3
      }
      if (判断奇穴('敛摄')) {
        最大充能层数 = 2
      }
      return {
        ...技能,
        技能CD: 技能原始CD,
        最大充能层数,
      }
    } else if (技能?.技能名称 === '停') {
      const 秘籍减冷却 = 判断秘籍减冷却('停云势', 秘籍)
      const 技能原始CD = (技能.技能CD || 0) - 秘籍减冷却
      return {
        ...技能,
        技能CD: 技能原始CD,
      }
    } else if (技能?.技能名称 === '游') {
      return 判断奇穴('流岚')
        ? {
            ...技能,
            技能CD: 每秒郭氏帧 * (50 - 15),
          }
        : 技能
    } else {
      return 技能
    }
  })

  return res
}

export const ERROR_ACTION = {
  怒气不足: {
    信息: '当前怒气不足，无法释放该技能',
  },
  体态错误: {
    信息: '当前体态无法释放该技能',
  },
  BUFF错误: {
    信息: '当前没有对应的BUFF',
  },
}

export const 起手识破BUFF = (Buff和Dot数据) => {
  return {
    识破: {
      ...Buff和Dot数据['识破'],
      当前层数: 1,
      刷新时间: 0,
    },
  }
}
