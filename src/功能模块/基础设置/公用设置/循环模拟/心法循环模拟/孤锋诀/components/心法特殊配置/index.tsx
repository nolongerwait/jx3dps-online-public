import React from 'react'
import styles from './index.module.less'
import { Checkbox, Select, Tooltip } from 'antd'
import { 按数字生成数组 } from '@/工具函数/help'
interface 心法特殊配制类型 {
  起手锐意: number
  设置起手锐意: (e: number) => void
  起手体态: '双刀' | '单刀'
  设置起手体态: (e: '双刀' | '单刀') => void
  显示破绽层数: boolean
  更新显示破绽层数: (e: boolean) => void
}

function 心法特殊配置(props: 心法特殊配制类型) {
  const { 起手锐意, 设置起手锐意, 起手体态, 设置起手体态, 显示破绽层数, 更新显示破绽层数 } = props

  return (
    <>
      <Checkbox
        style={{ marginLeft: 12 }}
        checked={显示破绽层数}
        onChange={(e) => 更新显示破绽层数(e?.target?.checked)}
      >
        <Tooltip title='显示技能开始释放时的破绽层数'>显示破绽层数</Tooltip>
      </Checkbox>
      <span className={styles.label}>起手锐意</span>
      <Tooltip title='起手锐意' placement='left'>
        <Select
          size='small'
          className={'cycle-simulator-header-select'}
          value={起手锐意}
          style={{ width: 120 }}
          showSearch
          popupMatchSelectWidth={120}
          filterOption={(input, option) => {
            return option?.value?.toString()?.includes(input) || false
          }}
          onChange={(e) => 设置起手锐意(e)}
          options={按数字生成数组(101).map((a) => {
            return {
              value: a - 1,
              label: `${a - 1} 锐意`,
            }
          })}
        />
      </Tooltip>
      <span className={styles.label}>起手体态</span>
      <Select
        size='small'
        className={'cycle-simulator-header-select'}
        value={起手体态}
        style={{ width: 120 }}
        popupMatchSelectWidth={120}
        onChange={(e) => 设置起手体态(e)}
        options={[
          { value: '单刀', label: '单刀' },
          { value: '双刀', label: '双刀' },
        ]}
      />
    </>
  )
}

export default 心法特殊配置
