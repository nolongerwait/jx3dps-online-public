import React, { useEffect, useRef, useState } from 'react'
import { Chart } from '@antv/g2'
import dataJson from './data.json'
import colorMap from './color.json'
import styles from './index.module.less'
import './index.css'

function 数据统计弹窗({ 数据源, 排序规则数组 }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<Chart>()
  const [sortedData, setSortedData] = useState<any[]>([])

  const 获取实际排名 = (num) => {
    return dataJson[数据源].length + 1 - num || 0
  }

  // 数据处理逻辑
  useEffect(() => {
    // 获取第一阶段排序规则
    const firstSortType = 排序规则数组[0]?.type

    // 生成排序基准数据
    const baseData = dataJson[数据源].map((item) => ({
      x: item.x,
      value: 获取实际排名(item[firstSortType]),
    }))

    // 按第一阶段排序
    const sortedX = baseData.sort((a, b) => a.value - b.value).map((item) => item.x)

    // 生成阶段数据
    const stageData = 排序规则数组.map((rule, index) => ({
      stage: rule.label,
      order: index + 1,
      data: dataJson[数据源]
        .map((item) => ({
          x: item.x,
          value: 获取实际排名(item[rule.type]),
          sortIndex: sortedX.indexOf(item.x), // 保持第一阶段排序
        }))
        .sort((a, b) => b.value - a.value),
    }))

    // 生成图表数据
    const chartData = sortedX.map((x) => {
      const item: any = { x }
      排序规则数组.forEach((rule, index) => {
        const stage = stageData[index]
        const record = stage.data.find((d) => d.x === x)
        item[`stage_${index}`] = record ? stage.data.indexOf(record) + 1 : 0
      })
      return item
    })

    setSortedData(chartData)
  }, [数据源, 排序规则数组])

  // 图表初始化
  useEffect(() => {
    if (!chartRef.current || !sortedData.length) return

    if (!chartInstance.current) {
      chartInstance.current = new Chart({
        container: chartRef.current,
        autoFit: true,
        padding: [50, 50, 50, 50],
      })
    }

    const chart = chartInstance.current

    // 清除旧数据
    chart.data([])
    chart.scale({})

    // 配置坐标系
    chart.scale('x', {
      type: 'cat',
      values: sortedData.map((d) => d.x),
    })

    chart.scale('stage', {
      type: 'cat',
      values: 排序规则数组.map((d) => d.label),
    })

    // 生成折线数据
    const lineData = sortedData.flatMap((d) =>
      排序规则数组.map((rule, index) => ({
        x: d.x,
        stage: rule.label,
        value: d[`stage_${index}`],
        order: index,
      }))
    )

    chart.data(lineData)

    // 绘制折线
    chart
      .line()
      .position('stage*value')
      .color('x', (val) => colorMap[val])
      .size(5)
      .tooltip(false)

    // 绘制点
    chart
      .point()
      .position('stage*value')
      .color('x', (val) => colorMap[val])
      .size(8)
      .shape('circle')
      .tooltip('x*stage*value', (x, stage, value) => {
        return {
          name: x,
          stage: stage,
          value: 获取实际排名(value),
        }
      })

    // 配置轴
    chart.axis('stage', false)

    chart.axis('value', false)

    chart.interaction('tooltip')

    sortedData.forEach((心法数据) => {
      const 首个阶段名称 = 排序规则数组[0]?.label
      const 首个阶段数值 = 心法数据[`stage_0`]

      chart.annotation().text({
        position: [首个阶段名称, 首个阶段数值],
        content: 心法数据.x,
        style: {
          fill: colorMap[心法数据.x],
          fontSize: 16,
          textAlign: 'right',
          shadowBlur: 2,
          shadowColor: 'rgba(0,0,0,0.5)',
        },
        offsetX: -32,
        offsetY: 0,
      })
    })

    chart.legend({
      position: 'right',
    })

    chart.render()

    return () => {
      chartInstance.current?.destroy()
      chartInstance.current = undefined
    }
  }, [sortedData])

  return <div ref={chartRef} className={styles.chart} />
}

export default 数据统计弹窗
