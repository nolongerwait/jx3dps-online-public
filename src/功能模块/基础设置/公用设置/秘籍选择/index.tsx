import { useState } from 'react'
import { Button } from 'antd'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import 秘籍选择抽屉 from './drawer'
import './index.css'

const { 心法所属端 } = 获取当前数据()

function 秘籍选择() {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <Button
        size='small'
        className='miji-set-button'
        onClick={() => setVisible(true)}
        disabled={心法所属端 === '无界'}
      >
        秘籍设置
      </Button>
      <秘籍选择抽屉 open={visible} onClose={() => setVisible(false)} />
    </>
  )
}

export default 秘籍选择
