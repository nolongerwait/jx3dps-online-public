import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 阵眼, 小药小吃, 主属性 } = 获取当前数据()

export const 计算部位枚举 = {
  阵眼: '阵眼',
  家园酒品: '家园酒品',
  药品辅助: '药品辅助',
  药品增强: '药品增强',
  食品辅助: '食品辅助',
  食品增强: '食品增强',
}

export const 初始化所有组合 = (计算部位, 是否过滤加速?: boolean) => {
  const res = {}
  // 先找出该装备部位支持的同种类的最大数值的附魔
  Object.keys(计算部位枚举)
    .filter((key) => 计算部位?.includes(key))
    .forEach((key) => {
      if (!res?.[key]) {
        res[key] = []
      }
      小药小吃?.forEach((item) => {
        if (item?.小吃部位?.includes(计算部位枚举[key] as any) && item?.小吃品级 !== '蓝') {
          const 小吃名称 = item?.小吃名称
          const 小吃增益类型 = item?.小吃名称?.split('（')?.[1]?.split('）')?.[0]

          // 判断主属性问题
          if (['力道', '身法', '根骨', '元气']?.includes(小吃增益类型)) {
            if (小吃增益类型 !== 主属性) {
              return
            }
          }

          // 判断是否过滤加速
          if (是否过滤加速) {
            if (小吃增益类型 === '加速') {
              return
            }
          }

          if (!res?.[key]?.includes(小吃名称)) {
            res[key].push(小吃名称)
          }
        }
      })
      if (key === '阵眼') {
        阵眼?.forEach((item) => {
          const 阵眼名称 = item?.阵眼名称
          res[key].push(阵眼名称)
        })
      }
    })

  // 先找出该装备部位支持的同种类的最大数值的附魔
  const generateCombinationsRes = generateCombinations(res)
  const filterUniqueObjectsRes = filterUniqueObjects(generateCombinationsRes)

  return filterUniqueObjectsRes
}
// 对数据进行排列组合，组合出所有的可能性
function generateCombinations(data) {
  const keys = Object.keys(data)
  const results: any[] = []

  function generate(index, currentCombination) {
    if (index === keys.length) {
      results.push(currentCombination)
      return
    }

    const key = keys[index]
    const values = data[key]

    for (const value of values) {
      generate(index + 1, {
        ...currentCombination,
        [key]: value,
      })
    }
  }

  generate(0, {})
  return results
}

// 对结果进行过滤，当存在计算条件完全一致时，过滤该情况
function filterUniqueObjects(arr) {
  const seen = new Set()
  const result: any[] = []

  for (const obj of arr) {
    // 创建唯一标识：按属性名排序后拼接属性值
    const keys = Object.keys(obj).sort()
    const identifier = keys.map((key) => obj[key]).join('|')

    if (!seen.has(identifier)) {
      seen.add(identifier)
      result.push(obj)
    }
  }

  return result
}
