import React from 'react'
import { Tabs } from 'antd'
import 加速阈值 from './加速阈值'
import 多段伤害倒读条 from './多段伤害倒读条'

import './index.css'

function 加速计算() {
  return (
    <div className='haste-layout'>
      <Tabs>
        <Tabs.TabPane tab='加速阈值' key='haste-1'>
          <加速阈值 />
        </Tabs.TabPane>
        <Tabs.TabPane tab='多段伤害倒读条' key='haste-2'>
          <多段伤害倒读条 />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default 加速计算
