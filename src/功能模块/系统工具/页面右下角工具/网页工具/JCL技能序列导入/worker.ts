import { 心法枚举 } from './职业技能映射枚举/index'
import 心法枚举JSON from '../../../../../数据/静态数据/心法枚举.json'

self.onmessage = (event) => {
  const { data } = event // 获取传入的数据
  // 假设我们进行一些复杂的计算
  const result = JCL技能序列导入(data)
  self.postMessage(result) // 将结果发送回主线程
}

export const JCL技能序列导入 = (原序列: string) => {
  // 拆分数组
  const 数组 = 原序列.split('\n')
  let 心法Id = ''
  let 心法映射数据: any

  try {
    // 第一次遍历，找到心法对应id
    for (let i = 0; i < 数组.length; i++) {
      // 根据制表符拆分
      const logList = 数组[i]?.split('\t')
      // 获取事件类型
      const type: string = logList[4]
      // 处理心法
      if (type === '4') {
        // 获取具体LogData
        const logData = logList[5]
        if (logData) {
          // 根据,拆分 获取技能id
          const list = logData?.split(',')
          if (list?.[3]) {
            心法Id = list?.[3]
            // 心法Id = '10698'
            console.info('心法Id', 心法Id)
            心法映射数据 = 心法枚举?.[心法枚举JSON?.[心法Id]?.name]
            break
          }
        }
      }
    }

    console.info('心法Id', 心法Id)

    // 结果数据
    let res: string[] = []

    console.info('心法映射数据', 心法映射数据)
    console.info('心法枚举JSON?.[心法Id]?.name', 心法枚举JSON?.[心法Id]?.name)

    if (心法映射数据) {
      for (let i = 0; i < 数组.length; i++) {
        // 根据制表符拆分
        const logList = 数组[i]?.split('\t')
        // 获取事件类型
        const type: string = logList[4]

        const logData = logList[5]
        if (logData) {
          const list = logData?.split(',')
          // 处理伤害类型
          if (type === '21') {
            // 获取具体LogData
            // 根据,拆分 获取技能id
            if (list?.[4]) {
              const id = list?.[4]
              // const check = !!+list?.[2]
              const check = true
              if (心法映射数据?.skills?.[id] && !!check) {
                if (typeof 心法映射数据?.skills?.[id] === 'string') {
                  res.push(心法映射数据?.skills?.[id])
                } else {
                  res = res.concat(心法映射数据?.skills?.[id])
                }
              }
            }
            // 判断获得Buff
          } else if (type === '13') {
            // 根据,拆分 获取技能id
            if (list?.[4]) {
              const id = list?.[4]
              if (心法映射数据?.buff映射技能?.[id]) {
                // 判断是否为上buff行为
                const isAdd = !!list?.[5]
                if (isAdd) {
                  res.push(心法映射数据?.buff映射技能?.[id])
                }
              }
            }
            // 判断释放技能，因为只要按宏就可以释放，这里用释放判断，且如果当前res最后一个已经是，则不push
          } else if (type === '20') {
            // 根据,拆分 获取技能id
            if (list?.[1]) {
              const id = list?.[1]
              if (心法映射数据?.释放且交验连续技能?.[id]) {
                const 不可重复技能组 = [
                  心法映射数据?.释放且交验连续技能?.[id]?.name,
                  ...(心法映射数据?.释放且交验连续技能?.[id]?.过滤技能 || []),
                ]
                if (!不可重复技能组?.includes(res?.[res?.length - 1])) {
                  res.push(心法映射数据?.释放且交验连续技能?.[id]?.name)
                }
              }
            }
          }
        }
      }
    }

    return res
  } catch (e) {
    console.error(e)
    return []
  }
}
