import React from 'react'

import 方案选择 from './方案选择'
import 目标选择 from './目标选择'
import 循环选择 from './循环选择'
import 延迟选择 from './延迟选择'
import 秘籍选择 from './秘籍选择'
import 奇穴选择 from './奇穴选择'
import 循环模拟 from './循环模拟'

import './index.css'

function 公用设置() {
  return (
    <div className={'common-set'}>
      <方案选择 />
      <目标选择 />
      <循环选择 />
      <延迟选择 />
      <div className='common-item' style={{ height: 'unset' }}>
        <秘籍选择 />
        <奇穴选择 />
        <循环模拟 />
      </div>
    </div>
  )
}

export default 公用设置
