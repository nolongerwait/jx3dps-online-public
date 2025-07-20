import { Select, Tooltip } from 'antd'
import React from 'react'
import styles from './index.module.less'
import { 按数字生成数组 } from '@/工具函数/help'

interface 心法特殊配制类型 {
  起手温寒: number
  更新起手温寒: (e: number) => void
}

function 心法特殊配置(props: 心法特殊配制类型) {
  const { 起手温寒, 更新起手温寒 } = props

  return (
    <>
      <span className={styles.label}>起手温寒</span>
      <Tooltip title='起手温寒' placement='left'>
        <Select
          size='small'
          className={'cycle-simulator-header-select'}
          value={起手温寒}
          style={{ width: 120 }}
          showSearch
          popupMatchSelectWidth={120}
          filterOption={(input, option) => {
            return option?.value?.toString()?.includes(input) || false
          }}
          onChange={(e) => 更新起手温寒(e)}
          options={按数字生成数组(11).map((a) => {
            const value = a - 6
            const label = value < 0 ? '寒性' : value > 0 ? '温性' : '中和'
            return {
              value: value,
              label: `${value === 0 ? '中和' : `${Math.abs(value)}点${label}`}`,
            }
          })}
        />
      </Tooltip>
    </>
  )
}

export default 心法特殊配置
