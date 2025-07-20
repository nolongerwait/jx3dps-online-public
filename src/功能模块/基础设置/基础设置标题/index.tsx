import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Button } from 'antd'
import { 更新增益面板显示状态, 更新当前引导步骤 } from '@/store/system'
import 保存方案 from './保存方案'

function 基础设置标题() {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)
  const 当前引导步骤 = useAppSelector((state) => state?.system?.当前引导步骤)
  const dispatch = useAppDispatch()

  const 切换增益面板显示状态 = () => {
    dispatch(更新增益面板显示状态(!增益面板显示状态))
    if (当前引导步骤 === 8 && !增益面板显示状态) {
      setTimeout(() => {
        dispatch(更新当前引导步骤(9))
      }, 200)
    }
  }

  return (
    <h1 className={'common-title'}>
      基础设置
      <div>
        <保存方案 />
        <Button id='Guide_12' danger size='small' onClick={() => 切换增益面板显示状态()}>
          增益详情
        </Button>
      </div>
    </h1>
  )
}

export default 基础设置标题
