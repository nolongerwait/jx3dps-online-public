import { 循环技能详情 } from '@/@types/循环'
import { 快照类型 } from '@/@types/技能'
import { 装备增益类型 } from '@/@types/装备'
import { 最终计算属性类型 } from '@/@types/计算'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 郭氏会心率算法 } from '@/计算模块/郭氏计算/伤害计算基础函数'
import { 获取属性加成后的面板 } from '@/计算模块/郭氏计算/郭氏技能总伤害计算'

export const 食髓动态函数 = (
  数据: 循环技能详情,
  人物属性: 最终计算属性类型,
  战斗时间 = 1,
  装备增益: 装备增益类型,
  快照计算: 快照类型[]
) => {
  let 额外会心率 = 人物属性?.额外会心率 || 0

  const 用于计算的人物面板 = 获取属性加成后的面板(人物属性, false)?.计算人物面板

  // 如果快照计算计算，则默认该技能以均摊方式计算（因为内部无套装buff
  if (快照计算?.includes('套装会心会效')) {
    const { 覆盖率 } = 获取当前数据()
    if (装备增益?.套装会心会效) {
      const 套装覆盖率 = 覆盖率?.套装会心会效 || 0.8
      额外会心率 = 额外会心率 + 0.04 * 套装覆盖率
    }
  }

  const 会心期望率 = Math.min(郭氏会心率算法(用于计算的人物面板?.会心等级) + (额外会心率 || 0), 1)
  const 总数 = 食髓会心率计算(会心期望率, 战斗时间)
  const 新数据 = JSON.parse(JSON.stringify(数据))
  return {
    ...新数据,
    技能数量: 总数,
    技能增益列表: [
      {
        增益名称: '虫兽,灵蛇献祭·1,嗜蛊',
        增益技能数: (总数 * 12) / 30,
      },
      {
        增益名称: '虫兽,嗜蛊',
        增益技能数: (总数 * 18) / 30,
      },
    ],
  }
}

function 食髓会心率计算(p: number, duration: number, cd = 12, delta = 6) {
  const x = cd - delta
  const y = cd
  const cache: { [key: number]: number } = {}

  function dp(t: number): number {
    if (t < x) {
      return 0
    } else if (t in cache) {
      return cache[t]
    } else {
      cache[t] = 1 + p * dp(t - x) + (1 - p) * dp(t - y)
      return cache[t]
    }
  }

  return dp(duration)
}
