import React from 'react'
import { 角色状态信息类型 } from '../../../simulator/type'

import { Tooltip } from 'antd'
import './index.css'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Titai(props: TitaiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>状态</div>
      <Tooltip title={角色状态信息?.状态}>
        {角色状态信息?.状态}
      </Tooltip>
    </div>
  )
}

export default Titai
