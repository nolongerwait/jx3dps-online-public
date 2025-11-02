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
      <div className={'cycle-status-bar-title'}>禅那</div>
      <div className={'cycle-status-bar-enerty-wrap'}>
        <div className={'cycle-status-bar-enerty-item'}>
          <Progress
            className={'yjj-cycle-status-bar-enerty'}
            percent={Math.floor(角色状态信息?.禅那 * 100 / 3)}
            format={(percent) => `${Math.floor((percent || 100) / 33)}`}
            size={26}
            steps={3}
            strokeColor={'hsl(46 60% 50% / 1)'}
          />
        </div>
      </div>
    </div>
  )
}

export default Enerty
