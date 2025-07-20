import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Spin, message } from 'antd'
import './index.css'
import { 获取数据 } from './tools'

const 支持导入心法列表 = ['凌海诀']

function 奇穴导入() {
  const [结果数据, 更新结果数据] = useState<any>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    form?.setFieldsValue({
      当前心法: 支持导入心法列表?.[0],
    })
  }, [])

  const 获取远程数据 = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true)
      const res = await 获取数据(values?.数据)
      if (res?.length) {
        更新结果数据(res)
      } else {
        message.error('解析出错')
      }
      setLoading(false)
    })
  }

  const copy = () => {
    const res = document.getElementById('tools-qixue-result')
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
        // if (text?.includes('未匹配')) {
        //   message.warning('存在未匹配装备')
        // }
        document.body.removeChild(input)
      }
    }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Form form={form} className={'tools-qixue-params'} layout='vertical'>
          <Form.Item name='数据' label='数据' required>
            <Input.TextArea className={'tool-qixue-input-area'} />
          </Form.Item>
        </Form>
        <div className={'tools-qixue-btns'}>
          <Button type='primary' className='tools-qixue-btn' onClick={获取远程数据}>
            获取数据
          </Button>
          <Button disabled={!结果数据} className='tools-qixue-btn' onClick={copy}>
            复制
          </Button>
        </div>
        {结果数据?.length && (
          <div id='tools-qixue-result' className={'tools-qixue-result'}>
            {JSON.stringify(结果数据)}
          </div>
        )}
      </Spin>
    </div>
  )
}

export default 奇穴导入
