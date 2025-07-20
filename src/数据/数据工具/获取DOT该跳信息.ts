import { 技能基础数据模型 } from '@/@types/技能'

const 获取DOT该跳信息 = (技能信息: 技能基础数据模型, DOT跳数: number): 技能基础数据模型 => {
  if (技能信息 && 技能信息?.跳数系数变动) {
    return {
      ...技能信息,
      技能伤害系数: (技能信息?.技能伤害系数 || 0) * 技能信息?.跳数系数变动(DOT跳数 || 1),
    }
  } else {
    return 技能信息 || ({} as any)
  }
}

export default 获取DOT该跳信息
