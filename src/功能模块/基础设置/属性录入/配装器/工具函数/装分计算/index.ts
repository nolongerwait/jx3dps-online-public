import { 装备信息数据类型 } from '@/@types/装备'
import { 装备列表装分计算 } from './工具函数/装备分数'
import { 获取五彩石分数 } from './工具函数/五彩石分数'
import { 获取大附魔分数 } from './工具函数/大附魔分数'

/**
 * 总装分计算
 * 装备分数+精炼成长分数+五行石+五彩石+大附魔总分
 * @param {*} 装备信息
 * @returns
 */
function 总装分计算(装备信息: 装备信息数据类型): number {
  const { 装备列表, 五彩石 } = 装备信息
  const 五彩石等级 = 五彩石 ? (五彩石?.includes('陆') ? '6' : '5') : 0

  const 装备列表总分 = 装备列表装分计算(装备列表)
  const 五彩石总分 = 五彩石等级 ? 获取五彩石分数(五彩石等级) : 0
  const 大附魔总分 = 获取大附魔分数(装备信息)

  return Math.round(装备列表总分 + 五彩石总分 + 大附魔总分)
}

export default 总装分计算
