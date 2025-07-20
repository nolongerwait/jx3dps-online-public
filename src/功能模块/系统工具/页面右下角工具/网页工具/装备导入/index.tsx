import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Select, Slider, Spin, message } from 'antd'
import 参数数据 from './参数数据.json'
import 赛季范围数据 from './赛季范围数据.mjs'
import { 获取数据 } from './tool.mjs'
import './index.css'

function EquipmentImport() {
  const [品级数组, 更新品级数组] = useState<number[]>(赛季范围数据.本赛季默认品级)
  const [结果数据, 更新结果数据] = useState<any>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    form?.setFieldsValue({
      duty: 2,
      position: 0,
      quality: 4,
      range: 赛季范围数据.本赛季默认品级,
    })
  }, [])

  const 获取远程数据 = async () => {
    更新结果数据(null)
    form.validateFields().then(async (values) => {
      setLoading(true)
      const res = await 获取数据({
        装备部位: values?.position,
        品级范围: values?.range,
        功法: values?.duty,
        装备质量: values?.quality,
      })
      if (res?.length) {
        更新结果数据(res)
      } else {
        message.error('没有匹配的装备')
      }
      setLoading(false)
    })
  }

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
        <Form form={form} className={'tools-daoru-params'} layout='vertical'>
          <Form.Item name='duty' label='功法' required>
            <Select
              className={'tools-daoru-params-select'}
              options={[
                { value: 1, label: '内功' },
                { value: 2, label: '外功' },
              ]}
              placeholder={'请选择功法类型'}
            />
          </Form.Item>
          <Form.Item name='position' label='装备部位' required>
            <Select
              className={'tools-daoru-params-select'}
              options={Object.keys(参数数据?.装备部位).map((key) => {
                return { label: key, value: 参数数据?.装备部位[key] }
              })}
              placeholder={'请选择装备部位'}
            />
          </Form.Item>
          <Form.Item name='quality' label='装备质量' required>
            <Select
              className={'tools-daoru-params-select'}
              options={[
                { value: 4, label: '紫色' },
                { value: 5, label: '橙色' },
              ]}
              placeholder={'请选择装备质量'}
            />
          </Form.Item>
          <Form.Item
            required
            name='range'
            label={
              <div className={'tools-daoru-params-label'}>
                <span>装备品级</span>
                <div className={'tools-daoru-params-numbers'}>
                  <InputNumber
                    className={'tools-daoru-params-number'}
                    value={品级数组?.[0]}
                    min={10000}
                    max={50000}
                    onChange={(e) => {
                      const newV = Math.min(e || 0, 品级数组?.[1]) || 0
                      const newData = [newV, 品级数组?.[1] || 0]
                      更新品级数组(newData)
                      form?.setFieldsValue({ range: newData })
                    }}
                  />
                  <InputNumber
                    min={10000}
                    max={50000}
                    className={'tools-daoru-params-number'}
                    value={品级数组?.[1]}
                    onChange={(e) => {
                      const newV = Math.max(e || 0, 品级数组?.[0]) || 0
                      const newData = [品级数组?.[0] || 0, newV]
                      更新品级数组(newData)
                      form?.setFieldsValue({ range: newData })
                    }}
                  />
                </div>
              </div>
            }
          >
            <Slider
              min={10000}
              max={20000}
              step={5}
              included
              onChange={(e) => 更新品级数组(e)}
              range
              // tooltip={{ open: true, placement: 'left' }}
            />
          </Form.Item>
        </Form>
        <div className={'tools-daoru-btns'}>
          <Button type='primary' className='tools-daoru-btn' onClick={获取远程数据}>
            获取数据
          </Button>
          <Button disabled={!结果数据} className='tools-daoru-btn' onClick={copy}>
            复制
          </Button>
          {/* <Button onClick={getDetail}>转换</Button> */}
        </div>
        {结果数据?.length && (
          <div id='tools-daoru-zhuangbei-result' className={'tools-daoru-result'}>
            {JSON.stringify(结果数据)}
          </div>
        )}
      </Spin>
    </div>
  )
}

export default EquipmentImport
