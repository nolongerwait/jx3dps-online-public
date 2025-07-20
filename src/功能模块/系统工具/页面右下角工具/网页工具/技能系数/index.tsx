import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
// import { JCL技能序列导入 } from './JCL技能序列导入'
import './index.css'
import { 解析数据 } from './tools'

const { TextArea } = Input

function 技能系数() {
  const [ids, setIds] = useState<any>()
  const [shuju, setShuju] = useState<any>()
  const [res, setRes] = useState<any>()

  const copy = () => {
    const res = document.getElementById('tools-daoru-zhuangbei-result')
    if (res) {
      const text = res?.innerHTML
      if (text) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', text)
        input.select()
        document.execCommand('copy') // 执行浏览器复制命令
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          message.success('复制成功')
        }
        if (text?.includes('未匹配')) {
          message.warning('存在未匹配装备')
        }
        document.body.removeChild(input)
      }
    }
  }

  const getDetail = () => {
    if (!ids || !shuju) {
      message.error('请输入数据')
      return
    }
    const getRes = 解析数据(ids, shuju)
    setRes(getRes)
  }

  return (
    <div>
      <TextArea
        placeholder={'输入解析id列表'}
        style={{ marginBottom: 16 }}
        value={ids}
        onChange={(e) => setIds(e?.target?.value)}
      />
      <TextArea
        placeholder={'输入skill数据'}
        style={{ marginBottom: 16 }}
        value={shuju}
        onChange={(e) => setShuju(e?.target?.value)}
      />
      <div className={'tools-daoru-btns'}>
        <Button type='primary' disabled={!res} className='tools-daoru-btn' onClick={copy}>
          复制
        </Button>
        <Button onClick={getDetail}>转换</Button>
      </div>
      {res && (
        <div id='tools-daoru-zhuangbei-result' className={'tools-daoru-result'}>
          {res}
        </div>
      )}
    </div>
  )
}

export default 技能系数
