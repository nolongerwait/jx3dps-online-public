import React from 'react'
import { 角色状态信息类型 } from '../../../simulator/type'

import Img_Fumo from '../../../assets/fumo.png'
import Img_Jiasha from '../../../assets/jiasha.png'
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
        <img
          className={'cycle-status-bar-titai-img'}
          src={角色状态信息?.状态 === '伏魔' ? Img_Fumo : Img_Jiasha}
          alt=''
        />
      </Tooltip>
    </div>
  )
}

export default Titai
