import { 属性简写枚举 } from '@/@types/枚举'
import { 大附魔ID, 本赛季英雄品级 } from '@/数据/常量/装备常量'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { DaFuMoMap, EquipPositionMap, 五彩石转换 } from '../统一映射枚举'

// 获取配装数据
export const getEquipData = (data) => {
  const { 装备数据, 附魔, 五彩石, 功法 } = 获取当前数据()

  const 全部五彩石数据 = 五彩石?.[6]

  const equip: any = {}
  const equipList = data || []
  let 已经计算过一个戒指 = false
  const 未内置附魔列表: string[] = []
  const 未识别装备列表: string[] = []
  const 额外消息: string[] = []
  // try {
  equipList.map((item) => {
    let 装备附魔: string | undefined = undefined
    // 判断附魔
    if (item?.WPermanentEnchant) {
      const 附魔数据 = item?.WPermanentEnchant?.Attributes?.[0]
      if (
        附魔数据 &&
        ![
          'atDecriticalDamageBase',
          'atDecriticalDamagePowerBase',
          // 'atDamageToLifeForSelf',
          'atToughnessBase',
        ].includes(附魔数据?.Desc)
      ) {
        const 附魔属性 = 附魔数据?.Desc
        const 附魔属性枚举 = 属性简写枚举?.[附魔属性]
        const 附魔值 = +附魔数据?.Attribute1Value1
        if (!附魔属性枚举) {
          未内置附魔列表.push(未支持附魔属性枚举[附魔属性] || 附魔属性)
          console.warn(`存在计算器未内置附魔${未支持附魔属性枚举[附魔属性]}`)
        } else {
          const 附魔数据判断 = 附魔?.some((item) => item?.附魔名称 === `${附魔属性枚举}+${附魔值}`)

          if (!附魔数据判断) {
            未内置附魔列表.push(`${附魔属性枚举}${附魔值}`)
            console.warn(`存在计算器未内置附魔${附魔属性枚举}${附魔值}`)
          } else {
            装备附魔 = `${附魔属性枚举}+${附魔值}`
          }
        }
      }
    }

    const 装备部位 = 装备部位格式化(item?.Icon, item?.EquipType)

    if (装备部位) {
      const 装备位置映射 =
        装备部位 === '戒指' ? (已经计算过一个戒指 ? '_10' : '_9') : EquipPositionMap[装备部位]

      const 装备原始数据 = 装备数据[装备部位]?.find((data) => +(data.id || 0) === +item.ID)

      if (装备原始数据) {
        equip[装备位置映射] = {
          当前精炼等级: +item?.StrengthLevel || +item?.MaxStrengthLevel,
          id: 装备原始数据?.id,
          装备部位: 装备部位,
          镶嵌孔数组: (装备原始数据?.镶嵌孔数组 || [])?.map((a, index) => {
            return {
              ...a,
              镶嵌宝石等级: +item?.FiveStone?.[index]?.Level || 8,
            }
          }),
          附魔: 装备附魔,
        }
      } else {
        未识别装备列表.push(item?.Name)
      }

      // 判断大附魔
      if (DaFuMoMap[装备部位]) {
        // 先判断ID
        if (item?.WCommonEnchant?.ID) {
          if (大附魔ID?.英雄?.some((a) => +item?.WCommonEnchant?.ID === +a)) {
            equip[DaFuMoMap[装备部位]] = 2
          } else if (大附魔ID?.普通?.some((a) => +item?.WCommonEnchant?.ID === +a)) {
            equip[DaFuMoMap[装备部位]] = 1
          } else {
            equip[DaFuMoMap[装备部位]] = 0
          }
        }
        if (!equip[DaFuMoMap[装备部位]]) {
          const 品级 = (装备原始数据?.装备品级 || 0) >= 本赛季英雄品级 ? 2 : 1
          equip[DaFuMoMap[装备部位]] = item?.WCommonEnchant ? 品级 : 0
        }
      }

      if (item?.effectColorStone && item?.effectColorStone?.Type === '五彩石') {
        let 五彩石名称 = item?.effectColorStone?.Name

        if (功法 !== '天罗诡道') {
          // 对内功五彩石做映射
          Object.keys(五彩石转换).forEach((key) => {
            if (五彩石名称?.includes(key)) {
              五彩石名称 = 五彩石名称.replace(key, 五彩石转换[key])
            }
          })
        }

        if (
          !全部五彩石数据?.some((item) => item.五彩石名称 === 五彩石名称.replace('(伍)', '(陆)'))
        ) {
          额外消息.push(`装备库未内置五彩石${item?.effectColorStone?.Name}`)
          五彩石名称 = ''
        }

        if (五彩石名称) {
          equip.五彩石 = 五彩石名称
        }
      }

      if (装备部位 === '戒指') {
        已经计算过一个戒指 = true
      }
    }
  })

  return {
    equip,
    未内置附魔列表,
    未识别装备列表,
  }
}

const 装备部位格式化 = (传入装备: any = {}, 传入额外信息: any = {}) => {
  const { Kind, SubKind } = 传入装备
  const { SubType } = 传入额外信息
  if (Kind === '武器' || SubType === '武器') {
    if (SubKind === '投掷囊') {
      return '暗器'
    } else {
      return '武器'
    }
  } else {
    return 装备部位转化枚举[SubKind]
  }
}

const 装备部位转化枚举 = {
  上衣: '衣服',
  帽子: '帽子',
  项链: '项链',
  戒指: '戒指',
  腰带: '腰带',
  腰坠: '腰坠',
  裤子: '下装',
  鞋: '鞋子',
  护臂: '护腕',
}

const 未支持附魔属性枚举 = {
  atDamageToLifeForSelf: '龙血磨石',
}
