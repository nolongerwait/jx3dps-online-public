// 奇穴数据，只在模拟循环内生效
import React from 'react'
import 奇穴选择抽屉 from '@/功能模块/基础设置/公用设置/奇穴选择/drawer'
import './index.css'

interface QixueSetProps {
  className?: string
  奇穴信息: string[]
  更新奇穴信息: (e: string[]) => void
  奇穴弹窗展示: boolean
  更新奇穴弹窗展示: (e: boolean) => void
}

const QixueSetModal: React.FC<QixueSetProps> = (props) => {
  const { 奇穴信息, 更新奇穴信息, 奇穴弹窗展示, 更新奇穴弹窗展示 } = props

  return (
    <奇穴选择抽屉
      value={奇穴信息}
      onChange={更新奇穴信息}
      open={奇穴弹窗展示}
      onClose={更新奇穴弹窗展示}
      mask={false}
    />
  )
}

export default QixueSetModal
