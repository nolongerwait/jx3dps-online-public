// import 心法枚举JSON from '../../../../../../..//数据/静态数据/心法枚举.json'
import { 大附魔ID } from '@/数据/常量/装备常量'
import { parse_lua } from '../../../../../../../工具函数/lua'
import 附魔ID枚举 from '../../../../../../../数据/附魔/id_map'

self.onmessage = (event) => {
  const { data } = event // 获取传入的数据
  // 假设我们进行一些复杂的计算
  const result = JCL技能序列导入(data)
  self.postMessage(result) // 将结果发送回主线程
}

export const JCL技能序列导入 = (原序列: string) => {
  // 拆分数组
  const 数组 = 原序列.split('\n')
  // 从后遍历，数据较全
  数组.reverse()
  const equip = {}
  // 参考文档 https://www.jx3box.com/tool/84749
  try {
    // 第一次遍历，找到心法对应id
    for (let i = 0; i < 数组.length; i++) {
      // 根据制表符拆分
      const logList = 数组[i]?.split('\t')
      // 获取事件类型
      const type: string = logList[4]
      // 处理心法
      if (type === '4') {
        try {
          // 获取具体LogData
          const logData = parse_lua(logList[5])
          const 总装备数据 = logData?.[5]
          if (logData && logData?.[5] && Object.keys(总装备数据)?.length) {
            Object.keys(总装备数据).forEach((key) => {
              const 装备数据 = 总装备数据[key]
              const 装备部位类型 = JCLEquipPositionMap[装备数据?.[0]]
              const 装备ID = 装备数据?.[2]
              const 装备附魔ID = 装备数据?.[5]
              const 附魔实际名称 = 附魔ID枚举[装备附魔ID]
              const 内部索引 = EquipPositionMap[装备部位类型]
              const 该装备大附魔ID = 装备数据?.[6]
              if (!内部索引) {
                console.log('内部索引-装备数据', 装备数据)
              }
              if (该装备大附魔ID) {
                // 判断大附魔是否存在
                let 大附魔等级: number | undefined = undefined
                if (大附魔ID?.英雄?.some((a) => +该装备大附魔ID === +a)) {
                  大附魔等级 = 2
                  console.log('命中英雄大附魔', 该装备大附魔ID)
                } else if (大附魔ID?.普通?.some((a) => +该装备大附魔ID === +a)) {
                  大附魔等级 = 1
                  console.log('命中普通大附魔', 该装备大附魔ID)
                } else {
                  大附魔等级 = undefined
                }
                equip[DaFuMoMap[装备部位类型]] = 大附魔等级
              }
              if (内部索引) {
                equip[内部索引] = {
                  id: 装备ID,
                  附魔: 附魔实际名称,
                }
              }
            })
            break
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    return equip
  } catch (e) {
    console.error(e)
    return []
  }
}

const JCLEquipPositionMap = {
  2: '暗器',
  3: '衣服',
  4: '帽子',
  5: '项链',
  6: '戒指',
  7: '戒指_2',
  8: '腰带',
  9: '腰坠',
  10: '下装',
  11: '鞋子',
  12: '护腕',
  0: '武器',
}

const EquipPositionMap = {
  帽子: '_1',
  衣服: '_2',
  腰带: '_3',
  护腕: '_4',
  下装: '_5',
  鞋子: '_6',
  项链: '_7',
  腰坠: '_8',
  戒指: '_9',
  戒指_2: '_10',
  暗器: '_11',
  武器: '_12',
}

const DaFuMoMap = {
  帽子: '大附魔_伤帽',
  衣服: '大附魔_伤衣',
  腰带: '大附魔_伤腰',
  护腕: '大附魔_伤腕',
  鞋子: '大附魔_伤鞋',
}