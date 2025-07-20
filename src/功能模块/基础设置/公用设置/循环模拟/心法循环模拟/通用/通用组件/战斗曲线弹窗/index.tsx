import { Modal, ModalProps } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Chart } from '@antv/g2'
import { 技能伤害详情类型 } from '../../../../typs'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'

const { 系统配置 } = 获取当前数据()

interface 战斗曲线弹窗类型 extends ModalProps {
  open: boolean
  onCancel: () => void
  技能伤害详情数据: 技能伤害详情类型[]
}

interface 伤害统计 {
  总伤: number
  秒伤: number
  时间: number
}

// 8帧统计一次总伤
const 统计间隔 = 24

function 战斗曲线弹窗(props: 战斗曲线弹窗类型) {
  const { open, onCancel, 技能伤害详情数据 } = props
  const [chartData, setChartData] = useState<any>()
  const limitRef: any = useRef<any>()

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        initChart()
      }, 20)
    }
    if (open) {
      limitRef.current = false
    } else {
      limitRef.current = false
      setChartData(undefined)
    }
  }, [open, 技能伤害详情数据])

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true

    const chart = chartData
      ? chartData
      : new Chart({
          container: 'cycle-line-count-chart',
          autoFit: true,
          renderer: 'canvas',
          padding: [50, 100, 50, 100],
        })

    chart.tooltip({
      crosshairs: false,
    })

    if (!chartData) {
      setChartData(chart)
    }

    const dataSource = getDataSource()

    chart.source(dataSource)
    chart.axis('时间', {
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fontSize: 16, // 文本大小
        },
      },
    })

    chart.scale('时间', {
      type: 'linear',
      tickInterval: 10,
    })

    const data = getDataSource()
    const 最终秒伤 = data[data.length - 1]?.秒伤

    chart.data(data)
    chart
      .line()
      .position('时间*秒伤')
      .color(系统配置?.收益柱形图颜色 || 系统配置?.主题色)
      .animate({
        enter: {
          animation: 'fade-in', // 动画名称
          easing: 'easeQuadIn', // 动画缓动效果
          delay: 100, // 动画延迟执行时间
          duration: 5000, // 动画执行时间
        },
      })

    chart.annotation().line({
      start: ['min', 最终秒伤],
      end: ['max', 最终秒伤],
      style: {
        stroke: '#ff4d4f',
        lineWidth: 1,
        lineDash: [3, 3],
      },
      text: {
        position: 'start',
        style: {
          fill: '#8c8c8c',
          fontSize: 15,
          fontWeight: 'normal',
        },
        content: '最终秒伤',
        offsetY: -5,
        offsetX: -65,
      },
    })

    // .color(DOMAIN_COLOR)
    chart.render()
    // setLoading(false)

    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  const getDataSource = () => {
    const 最终数据 = 获取秒伤统计(技能伤害详情数据, 统计间隔)
    return 最终数据
  }

  const 获取秒伤统计 = (原始数据: 技能伤害详情类型[], 统计间隔) => {
    const 最终数据: 伤害统计[] = [{ 总伤: 0, 时间: 0, 秒伤: 0 }]
    // const 最终数据: 伤害统计[] = []
    let 总伤 = 0
    let 间隔 = 统计间隔
    for (let i = 0; i < 原始数据.length; i++) {
      const 数据 = 原始数据[i]
      if (数据?.时间 > 间隔) {
        最终数据.push({
          总伤: 总伤,
          时间: 间隔 / 16,
          秒伤: 总伤 / (间隔 / 16),
        })
        间隔 = 间隔 + 统计间隔
      }
      总伤 = 总伤 + 数据?.伤害

      if (i === 原始数据.length - 1) {
        最终数据.push({
          总伤: 总伤,
          时间: 数据?.时间 / 16,
          秒伤: 总伤 / (数据?.时间 / 16),
        })
      }
    }

    return 最终数据
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <div className={'cycle-simulator-modal-header'}>
          <h1 className={'cycle-simulator-modal-title'}>战斗秒伤曲线</h1>
        </div>
      }
      width={'80%'}
      centered
      footer={false}
    >
      {open ? <div id='cycle-line-count-chart' className={'cycle-line-count-chart'} /> : null}
    </Modal>
  )
}

export default 战斗曲线弹窗

// function countByName(arr) {
//   const obj = arr.reduce((acc, item) => {
//     // 获取名称
//     const name = item.名称
//     const damage = item.伤害 || 0 // 确保伤害字段存在，默认为 0

//     // 如果名称不存在于累计对象中，则初始化
//     if (!acc[name]) {
//       acc[name] = { count: 0, totalDamage: 0 }
//     }

//     // 增加计数和伤害总和
//     acc[name].count += 1
//     acc[name].totalDamage += damage

//     return acc
//   }, {})

//   const list = Object.entries(obj)
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     .map(([name, stats]) => ({ name, ...stats })) // 转换为对象形式
//     .sort((a, b) => b.totalDamage - a.totalDamage) // 按 totalDamage 排序

//   return list
// }
