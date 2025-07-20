// import { 每秒郭氏帧 } from '../constant'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型 } from './type'

export const 根据奇穴修改buff数据 = () => {
  // const res = {}

  // Object.keys(原始Buff数据).forEach((key) => {
  //   const obj = 原始Buff数据[key]
  //   res[key] = obj
  // })

  return 原始Buff数据
}

export const 根据奇穴秘籍修改技能数据 = (): 循环基础技能数据类型[] => {
  // const 判断奇穴 = (val) => {
  //   return 奇穴?.includes(val)
  // }

  return 循环模拟技能基础数据
}

export const ERROR_ACTION = {
  锐意不足: {
    信息: '当前锐意不足，无法释放该技能',
  },
  身形不足: {
    信息: '当前身形不足，无法释放该技能',
  },
  体态错误: {
    信息: '当前体态无法释放该技能',
  },
  BUFF错误: {
    信息: '当前没有对应的BUFF',
  },
}

export const 转化buff和增益名称 = (增益名称, buff列表) => {
  if (增益名称?.includes('披靡·悟')) {
    const 增益层数 = 增益名称?.split('·')?.[2]?.[0] || 0
    if (!增益层数) {
      return {}
    } else {
      return +buff列表?.['披靡·悟']?.当前层数 === +增益层数 ? buff列表?.['披靡·悟'] : {}
    }
  } else {
    return buff列表?.[增益名称]
  }
}
