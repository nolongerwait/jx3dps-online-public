import React from 'react'
import { 角色状态信息类型 } from '../../../simulator/type'

import { Tooltip } from 'antd'
import './index.css'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Titai(props: TitaiProps) {
  const { 角色状态信息 } = props

  const 体态图标 = {
    落地: 'https://icon.jx3box.com/icon/10856.png',
    撑伞浮空: 'https://icon.jx3box.com/icon/10765.png',
    物化天行: 'https://icon.jx3box.com/icon/10764.png',
  }

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>体态</div>
      <Tooltip title={角色状态信息?.体态}>
        <img className={'cycle-status-bar-titai-img'} src={体态图标[角色状态信息?.体态]} alt='' />
      </Tooltip>
    </div>
  )
}

export default Titai
