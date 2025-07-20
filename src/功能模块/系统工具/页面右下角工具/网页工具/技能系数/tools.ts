import { 技能基础数据模型 } from '@/@types/技能'
import { 去除对象中的无效值 } from '@/工具函数/help'

export const 解析数据 = (ids, shuju) => {
  const idObj = JSON.parse(ids)
  const data = JSON.parse(shuju)

  const res: 技能基础数据模型[] = []

  Object.keys(idObj)?.forEach((key) => {
    const getData = data?.[key]
    if (getData) {
      const damage_base_key =
        Object?.keys(getData)?.find((item) => item?.includes('_damage_base')) || ''
      const damage_rand_key =
        Object?.keys(getData)?.find((item) => item?.includes('_damage_rand')) || ''
      const obj: 技能基础数据模型 = {
        技能ID: key,
        技能名称: getData?.skill_name,
        技能伤害系数: getData?.channel_interval,
        基础伤害_基础值: getData?.[damage_base_key],
        基础伤害_浮动值: getData?.[damage_rand_key],
        武器伤害系数: getData?.weapon_damage_cof ? getData?.weapon_damage_cof / 1024 : undefined,
        技能增益列表: `通用增益`,
      } as any

      const 最大等级 = getData?.max_level
      if (typeof getData?.channel_interval === 'object') {
        obj.技能伤害系数 = getData?.channel_interval?.[最大等级 - 1]
      }

      if (typeof getData?.[damage_base_key] === 'object') {
        obj.基础伤害_基础值 = getData?.[damage_base_key]?.[最大等级 - 1]
      }
      if (typeof getData?.[damage_rand_key] === 'object') {
        obj.基础伤害_浮动值 = getData?.[damage_rand_key]?.[最大等级 - 1]
      }

      res.push(去除对象中的无效值(obj))
    }
  })
  // console.info('res', res)

  return JSON.stringify(res)
}
