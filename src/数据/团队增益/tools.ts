/**
 * 根据团队增益轴数据，判断该时间包含的团队增益数据
 */

import { 团队增益轴类型 } from '@/@types/团队增益'

interface 判断团队增益快照BuffProps {
  团队增益轴: 团队增益轴类型
  判定帧: number
}

const 判断团队增益快照Buff = (props: 判断团队增益快照BuffProps) => {
  const 最终包含增益: string[] = []

  const { 判定帧 = 0, 团队增益轴 } = props

  // 先判定号令三军
  const 号令三军数据 = 团队增益轴?.['号令三军']
  const 号令三军释放时间 = 号令三军数据?.[0] || 0

  // 一鼓
  if (判定帧 >= 号令三军释放时间 && 判定帧 < 号令三军释放时间 + 号令三军数据?.持续时间) {
    最终包含增益.push('号令三军_快照_一鼓')
  } else if (
    判定帧 >= 号令三军释放时间 + 号令三军数据?.持续时间 &&
    判定帧 < 号令三军释放时间 + 号令三军数据?.持续时间 + 号令三军数据?.持续时间
  ) {
    最终包含增益.push('号令三军_快照_二鼓')
  }

  // 判定其他增益
  Object.keys(团队增益轴)
    ?.filter((item) => item !== '号令三军' && item !== '弘法')
    ?.forEach((增益名称) => {
      const 增益数据 = 团队增益轴[增益名称]
      const 初次释放时间 = 增益数据?.释放时间点?.[0] || 0
      if (增益数据 && 判定帧 >= 0) {
        const 增益是否包含 = 判断时间点是否在事件内(
          初次释放时间,
          增益数据?.平均间隔,
          增益数据?.持续时间,
          判定帧
        )
        if (增益是否包含) {
          最终包含增益.push(`${增益名称}_快照`)
        }
      }
    })

  return 最终包含增益
}

const 判断时间点是否在事件内 = (startTime, interval, duration, checkTime) => {
  let n = 0
  // eslint-disable-next-line no-constant-condition
  while (n < 100) {
    const eventStart = startTime + n * interval
    const eventEnd = eventStart + duration
    // 如果当前事件的开始时间超过了检查时间，直接结束循环
    if (eventStart > checkTime) {
      break
    }
    // 检查 checkTime 是否在当前事件的覆盖范围内
    if (eventStart <= checkTime && checkTime < eventEnd) {
      return true
    }
    n++
  }
  return false
}

export const 判断团队增益轴快照计算 = (
  循环快照计算列表: string[] | undefined,
  团队增益轴: 团队增益轴类型
) => {
  if (循环快照计算列表?.length) {
    return 循环快照计算列表?.filter((item) => {
      if (团队增益轴?.[item]) {
        return 团队增益轴?.[item]?.是否启用快照
      } else {
        return true
      }
    })
  } else {
    return []
  }
}

export default 判断团队增益快照Buff
