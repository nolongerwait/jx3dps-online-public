import { Checkbox } from 'antd'
import React from 'react'

interface 心法特殊配制类型 {
  启用斩杀: boolean
  更新启用斩杀: (e: boolean) => void
  五十血以下: boolean
  更新五十血以下: (e: boolean) => void
  显示龙牙龙驭层数: boolean
  更新显示龙牙龙驭层数: (e: boolean) => void
  启用血量消耗计算: boolean
  更新启用血量消耗计算: (e: boolean) => void
}

function 心法特殊配置(props: 心法特殊配制类型) {
  const {
    启用斩杀,
    更新启用斩杀,
    五十血以下,
    更新五十血以下,
    显示龙牙龙驭层数,
    更新显示龙牙龙驭层数,
    启用血量消耗计算,
    更新启用血量消耗计算,
  } = props

  return (
    <>
      <Checkbox checked={显示龙牙龙驭层数} onChange={(e) => 更新显示龙牙龙驭层数(e.target.checked)}>
        显示龙牙龙驭层数
      </Checkbox>
      <Checkbox checked={启用斩杀} onChange={(e) => 更新启用斩杀(e.target.checked)}>
        <b>目标</b>
        血量低于80%
      </Checkbox>
      <Checkbox checked={五十血以下} onChange={(e) => 更新五十血以下(e.target.checked)}>
        <b>自身</b>
        血量低于50%
      </Checkbox>
      <Checkbox checked={启用血量消耗计算} onChange={(e) => 更新启用血量消耗计算(e.target.checked)}>
        启用血量消耗计算
      </Checkbox>
    </>
  )
}

export default 心法特殊配置
