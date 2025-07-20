import { Select, Tooltip } from 'antd'
import React from 'react'
import styles from './index.module.less'

interface 心法特殊配制类型 {
  起手回能帧: number
  更新起手回能帧: (e: number) => void
  起手能量: { 任脉: number; 督脉: number }
  更新起手能量: (e: { 任脉: number; 督脉: number }) => void
}

function 心法特殊配置(props: 心法特殊配制类型) {
  const { 起手回能帧, 更新起手回能帧, 起手能量, 更新起手能量 } = props

  return (
    <>
      <span className={styles.label}>起手任脉</span>
      <Tooltip title='起手任脉' placement='left'>
        <Select
          size='small'
          className={'cycle-simulator-header-select'}
          value={起手能量?.任脉}
          style={{ width: 70 }}
          showSearch
          popupMatchSelectWidth={120}
          filterOption={(input, option) => {
            return option?.value?.toString()?.includes(input) || false
          }}
          onChange={(e) => 更新起手能量({ ...起手能量, 任脉: e })}
          options={Array.from({ length: 101 }, (v, i) => i).map((a) => {
            const value = 100 - a
            return {
              value: value,
              label: `${value}`,
            }
          })}
        />
      </Tooltip>
      <span className={styles.label}>起手督脉</span>
      <Tooltip title='起手督脉' placement='left'>
        <Select
          size='small'
          className={'cycle-simulator-header-select'}
          value={起手能量?.督脉}
          style={{ width: 70 }}
          showSearch
          popupMatchSelectWidth={120}
          filterOption={(input, option) => {
            return option?.value?.toString()?.includes(input) || false
          }}
          onChange={(e) => 更新起手能量({ ...起手能量, 督脉: e })}
          options={Array.from({ length: 101 }, (v, i) => i).map((a) => {
            const value = 100 - a
            return {
              value: value,
              label: `${value}`,
            }
          })}
        />
      </Tooltip>
      <span className={styles.label}>起手第一次回能</span>
      <Tooltip title='起手第一次经脉循行Buff回能帧节点' placement='left'>
        <Select
          size='small'
          className={'cycle-simulator-header-select'}
          value={起手回能帧}
          style={{ width: 70 }}
          onChange={更新起手回能帧}
          options={Array.from({ length: 16 }, (v, i) => i).map((a) => {
            return {
              value: a,
              label: `${a}帧`,
            }
          })}
        />
      </Tooltip>
    </>
  )
}

export default 心法特殊配置
