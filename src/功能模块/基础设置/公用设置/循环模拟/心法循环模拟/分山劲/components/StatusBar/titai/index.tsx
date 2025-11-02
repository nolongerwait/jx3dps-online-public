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
      <div className={'cycle-status-bar-title'}>体态</div>
      <Tooltip title={角色状态信息?.体态}>
        <img
          className={'cycle-status-bar-titai-img'}
          src={
            角色状态信息?.体态 === '擎盾'
              ? 'https://icon.jx3box.com/icon/6443.png'
              : 'https://icon.jx3box.com/icon/6444.png'
          }
          alt=''
        />
      </Tooltip>
    </div>
  )
}

export default Titai
