import React from 'react'
import { 角色状态信息类型 } from '../../../simulator/type'
import { Progress } from 'antd'
import './index.css'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Enerty(props: TitaiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={'cycle-status-bar-content cycle-status-energy-content'}>
      <div className={'cycle-status-bar-title'}>能量</div>
      <div className={'cycle-status-bar-enerty-wrap'}>
        <div className={'cycle-status-bar-enerty-item'}>
          <span>任脉</span>
          <Progress
            className={'cycle-status-bar-enerty'}
            percent={Math.floor(角色状态信息?.能量信息?.任脉)}
            format={(percent) => `${percent}`}
          />
        </div>
        <div className={'cycle-status-bar-enerty-item'}>
          <span>督脉</span>
          <Progress
            className={'cycle-status-bar-enerty'}
            percent={Math.floor(角色状态信息?.能量信息?.督脉)}
            format={(percent) => `${percent}`}
          />
        </div>
      </div>
    </div>
  )
}

export default Enerty
