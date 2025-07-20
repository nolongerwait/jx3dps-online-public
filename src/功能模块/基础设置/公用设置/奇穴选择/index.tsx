import React, { useState } from 'react'
import { Button } from 'antd'
import 奇穴选择抽屉 from './drawer'
import './index.css'

const 奇穴选择: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <>
      <Button size='small' className='qixue-set-button' onClick={() => setDrawerOpen(true)}>
        奇穴设置
      </Button>
      <奇穴选择抽屉 open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default 奇穴选择
