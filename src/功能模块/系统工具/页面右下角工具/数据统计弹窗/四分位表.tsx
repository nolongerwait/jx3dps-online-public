import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Chart } from '@antv/g2'
import dataJson from './data.json'
import colorMap from './color.json'
import styles from './index.module.less'
import './index.css'

function 四分位表({ 数据源, 排序规则 }) {
  const [chartData, setChartData] = useState<any>()
  const limitRef: any = useRef<any>()

  useEffect(() => {
    setTimeout(() => {
      initChart()
    }, 20)
    return () => {
      limitRef.current = false
      setChartData(undefined)
    }
  }, [排序规则, 数据源])

  const 所有数据最小和最大值 = useMemo(() => {
    let min = undefined
    let max = undefined
    ;(dataJson[数据源] || [])?.forEach((item) => {
      if (min === undefined || min > item.low) {
        min = item?.low
      }
      if (max === undefined || max < item.max) {
        max = item?.max
      }
    })
    return { min, max }
  }, [数据源])

  // 按规则排序
  const 按规则排序数据 = (data) => {
    const list = data.map((obj) => {
      return {
        ...obj,
        range: [obj.low, obj.q1, obj.median, obj.q3, obj.high],
        outliers: [obj.max],
      }
    })
    if (排序规则 === 'max') {
      list.sort((a, b) => {
        return a.max - b.max
      })
    } else {
      list.sort((a, b) => {
        return a.range[排序规则] - b.range[排序规则]
      })
    }
    return list
  }

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true

    const chart = chartData
      ? chartData
      : new Chart({
          container: 'dps-change-count-chart',
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

    chart.scale({
      range: {
        min: 所有数据最小和最大值?.min,
        max: 所有数据最小和最大值?.max,
        nice: true,
      },
      outliers: {
        min: 所有数据最小和最大值?.min,
        max: 所有数据最小和最大值?.max,
        nice: true,
      },
    })

    const data = 按规则排序数据(dataJson[数据源])

    chart.data(data)
    chart.coordinate().transpose()

    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li data-index={index} style="padding: 4px">' +
        `<h1 class="change-tooltip-list-item-title">{name}</h1>` +
        '<span class="change-tooltip-list-item">最大值<span class="change-tooltip-list-item-value">{max}</span></span>' +
        '<span class="change-tooltip-list-item">前5%<span class="change-tooltip-list-item-value">{high}</span></span>' +
        '<span class="change-tooltip-list-item">前20%<span class="change-tooltip-list-item-value">{q3}</span></span>' +
        '<span class="change-tooltip-list-item">前40%<span class="change-tooltip-list-item-value">{median}</span></span>' +
        '<span class="change-tooltip-list-item">前60%<span class="change-tooltip-list-item-value">{q1}</span></span>' +
        '<span class="change-tooltip-list-item">前80%<span class="change-tooltip-list-item-value">{low}</span></span>' +
        '</li>',
    })

    // 修改 schema position 为横向展示：Y*数值
    chart.axis('x', {
      label: {
        style: {
          fill: '#000',
          fontSize: 14, // 文本大小
        },
      },
    })
    chart.axis('range', {
      label: {
        style: {
          fill: '#000',
          fontSize: 14, // 文本大小
        },
      },
    })
    chart
      .schema()
      .position('x*range') // 改为 range 在 x 轴，x 在 y 轴
      .shape('box')
      .style('x', (val) => {
        return {
          stroke: '#545454',
          fill: colorMap[val],
          fillOpacity: 0.85,
        }
      })
      .tooltip('x*low*q1*median*q3*high*max', (x, low, q1, median, q3, high, max) => {
        return {
          name: x,
          low: low,
          q1: q1,
          median: median,
          q3: q3,
          high: high,
          max: max,
        }
      })

    chart
      .point()
      .position('x*outliers')
      .shape('circle')
      .style('x', (val) => {
        return {
          stroke: '#545454',
          fill: colorMap[val],
          fillOpacity: 0.85,
        }
      })
      .size(4)
      .tooltip(false)

    chart.render()

    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  return <div id='dps-change-count-chart' className={styles.chart} />
}

export default 四分位表
