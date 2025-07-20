import { Button } from 'antd'
import React from 'react'
import { 触发秒伤计算 } from '@/计算模块/计算函数'
import { useAppDispatch } from '@/hooks'
import './index.css'

function Footer() {
  const dispatch = useAppDispatch()
  const 计算伤害 = () => {
    dispatch(触发秒伤计算({ 是否更新显示计算结果: true }))
  }
  return (
    <div className={'basic-footer'}>
      <Button className={'basic-footer-btn'} type='primary' onClick={() => 计算伤害()}>
        计算
      </Button>
    </div>
  )
}

export default Footer
