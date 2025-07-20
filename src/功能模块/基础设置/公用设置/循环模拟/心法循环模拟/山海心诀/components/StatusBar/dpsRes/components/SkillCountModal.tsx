import React, { useMemo } from 'react'
import 结果统计 from '@/功能模块/计算结果/结果统计'
import { 循环日志数据类型 } from '../../../../simulator/type'
import { Divider, Popover } from 'antd'
import '../../../../index.css'
import { 计算结果技能列表类型 } from '@/@types/输出'

interface SkillCountModalProps {
  open: boolean
  onCancel: () => void
  dpsList: 计算结果技能列表类型[]
  total: number
  日志信息: 循环日志数据类型[]
}

const SkillCountModal: React.FC<SkillCountModalProps> = (props) => {
  const { open, onCancel, total, dpsList, 日志信息 } = props

  const { 引爆次数, 引爆倍率, 总倍率, 贯穿统计数组 } = useMemo(() => {
    const 引爆贯穿数组 = (日志信息 || [])?.filter((item) => {
      return item?.日志?.includes('- 引爆') && item?.日志?.includes('贯穿')
    })
    const 贯穿数组 = (日志信息 || [])
      ?.filter((item) => {
        return (
          item?.日志?.includes('贯穿') &&
          (item?.日志类型?.includes('造成伤害') || item?.日志?.includes('- 引爆'))
        )
      })
      .map((item) => item?.日志)
    const { 引爆倍率, 总倍率, 贯穿统计数组 } = 获取贯穿总倍率(贯穿数组)
    return {
      引爆次数: 引爆贯穿数组?.length,
      引爆倍率,
      总倍率,
      贯穿统计数组,
    }
  }, [日志信息])

  return (
    <结果统计
      title={
        <div className={'cycle-simulator-modal-header space-between'}>
          <h1 className={'cycle-simulator-modal-title'}>技能统计</h1>
          <Popover
            content={
              <div>
                <p>引爆次数：{引爆次数}</p>
                <p>引爆倍率：{引爆倍率}</p>
                <p>总倍率：{总倍率}</p>
                <Divider style={{ margin: '4px 0' }} />
                {Object.keys(贯穿统计数组).map((item) => {
                  return (
                    <p key={`贯穿统计${item}`}>
                      贯穿·{item}：{贯穿统计数组[item]}次
                    </p>
                  )
                })}
              </div>
            }
          >
            <span className={'cycle-simulator-help'}>贯穿细节</span>
          </Popover>
        </div>
      }
      计算结果={{
        总伤: total,
        计算结果技能列表: dpsList,
      }}
      visible={open}
      onClose={() => onCancel()}
    />
  )
}

export default SkillCountModal

export const 获取贯穿对应实际倍率 = (日志) => {
  const 当前层数 = Number(日志?.split('·')?.[1])
  const 当前引爆跳数 = 日志?.includes('- 引爆') ? Number(日志?.split('【')?.[2]?.[0]) : 0
  if (当前引爆跳数) {
    const 层数 = Number(日志?.split('【')?.[1]?.[0])
    const 当前引爆倍率 = 日志?.includes('- 引爆') ? 当前引爆跳数 : 1
    return {
      本次倍率: 层数 * 当前引爆倍率,
      引爆: true,
    }
  } else if (当前层数) {
    return {
      本次倍率: 当前层数,
      引爆: false,
    }
  } else {
    return {
      本次倍率: 1,
      引爆: false,
    }
  }
}

const 获取贯穿总倍率 = (贯穿数组) => {
  let 倍率 = 0
  let 引爆倍率 = 0

  const 贯穿统计完整数据 = 贯穿数组
    .map((item) => {
      const { 本次倍率, 引爆 } = 获取贯穿对应实际倍率(item)
      if (引爆) {
        引爆倍率 = 引爆倍率 + 本次倍率
        return -1
      } else {
        倍率 = 倍率 + 本次倍率
        return 本次倍率
      }
    })
    .filter((item) => item !== -1)

  const 贯穿统计数组 = 获取贯穿的出现次数(贯穿统计完整数据)
  return {
    总倍率: 倍率,
    引爆倍率: 引爆倍率,
    贯穿统计数组,
  }
}

function 获取贯穿的出现次数(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)
    return acc
  }, {})
}
