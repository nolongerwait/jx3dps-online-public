import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Spin, message } from 'antd'
import { 心法枚举, 战斗数据转换 } from './tool'
import { 循环详情 } from '@/@types/循环'
import { useAppSelector } from '@/hooks'
import { 数据埋点 } from '@/工具函数/tools/log'
import 使用说明 from './使用说明'
import 保存循环弹窗 from './保存循环弹窗'
import './index.css'

const 支持导入心法列表 = Object.keys(心法枚举)

function JCL战斗记录解析() {
  const [结果数据, 更新结果数据] = useState<循环详情>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [导入循环保存弹窗, 设置导入循环保存弹窗] = useState<boolean>(false)
  const [目标心法, 设置目标心法] = useState(支持导入心法列表?.[0])
  const [原始数据, 设置原始数据] = useState<string | undefined>(undefined)
  const [团队增益快照, 设置团队增益快照] = useState<string>('快照')
  const 团队增益轴 = useAppSelector((state) => state?.data?.团队增益轴)

  useEffect(() => {
    form?.setFieldsValue({
      目标心法: 支持导入心法列表?.[0],
      战斗时间: 999,
      // 解析方式: '新版',
      截断伤害ID: undefined,
      团队增益轴计算方式: '快照',
      记录伤害数据: '不记录',
    })
    设置团队增益快照('快照')
  }, [form, 支持导入心法列表])

  const 获取远程数据 = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true)
      // values?.解析方式 === '新版' ?
      let 最大时间 = values?.战斗时间
      if (values?.截断伤害ID) {
        const JSONData = JSON.parse(values?.数据 || '{}')
        Object.keys(JSONData).forEach((currentKey) => {
          const key = currentKey?.replaceAll('(', '')?.replaceAll(')', '')?.replaceAll('|', '')
          const 全部技能数据 = key?.split('#')
          const 全部技能 = [
            `${全部技能数据[0]}#${全部技能数据[1]}`,
            全部技能数据[2],
            全部技能数据[3],
          ]?.filter((item) => item)
          const 获取技能数据 = 全部技能?.[0]?.split('#')?.[1]?.split('-')
          const 获取技能ID = 获取技能数据?.[0]
          if (获取技能ID === values?.截断伤害ID) {
            const timeLineData = JSONData?.[currentKey]?.['']?.timeline
            if (timeLineData?.length) {
              const list = timeLineData?.map((a) => a[0])
              const resTime = Math.max(...list)
              最大时间 = resTime / 16
            }
          }
        })
      }
      const res = await 战斗数据转换({
        心法: values?.目标心法,
        数据: values?.数据,
        最大时间: 最大时间,
        最小时间: 0,
        团队增益轴,
        导入启用团队快照: values?.团队增益轴计算方式 === '快照',
        记录伤害数据: values?.记录伤害数据 === '记录',
      })
      // : await 获取数据({
      //     心法: values?.目标心法,
      //     数据: values?.数据,
      //     最大时间: values?.战斗时间,
      //     最小时间: 0,
      //   })
      if (res?.技能详情?.length && res?.战斗时间) {
        数据埋点('解析JCL')
        更新结果数据(res)
        // 设置解析方式(values?.解析方式)
        message.success(`解析成功，战斗时间为 ${res?.战斗时间}s`)
      } else {
        message.error('解析出错')
      }
      setLoading(false)
    })
  }

  const copy = () => {
    const res = document.getElementById('tools-jcl-result')
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

  const save = () => {
    // const 奇穴校验 = 判断奇穴(目标心法, 原始数据)
    // if (奇穴校验?.length) {
    设置导入循环保存弹窗(true)
    // }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Form form={form} className={'tools-jcl-params'} layout='vertical'>
          <Form.Item className={'tools-jcl-form-item'} name='目标心法' label='心法' required>
            <Select
              value={目标心法}
              onChange={(e) => 设置目标心法(e)}
              className={'tools-jcl-params-select'}
              options={支持导入心法列表.map((item) => ({ value: item, label: item }))}
              placeholder={'请选择解析心法'}
            />
          </Form.Item>
          <Form.Item className={'tools-jcl-form-item'} name='战斗时间' label='战斗时间' required>
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item className={'tools-jcl-form-item'} name='截断伤害ID' label='截断伤害ID'>
            <Input style={{ width: '100%' }} placeholder='不输入则按战斗时间计算' maxLength={10} />
          </Form.Item>
          {/* <Form.Item className={'tools-jcl-form-item-3'} name='解析方式' label='解析方式' required>
            <Select
              className={'tools-jcl-params-select'}
              options={[
                { label: '新版', value: '新版' },
                // { label: '旧版', value: '旧版' },
              ]}
              placeholder={'请选择解析方式'}
            />
          </Form.Item> */}
          <Form.Item
            className={'tools-jcl-form-item'}
            name='团队增益轴计算方式'
            label='团队增益轴计算方式'
            required
          >
            <Select
              className={'tools-jcl-params-select'}
              options={[
                { label: '快照', value: '快照' },
                { label: '均摊', value: '均摊' },
              ]}
              placeholder={'请选择团队增益快照'}
              onChange={(e) => 设置团队增益快照(e)}
            />
          </Form.Item>
          <Form.Item
            className={'tools-jcl-form-item'}
            name='记录伤害数据'
            label='记录伤害数据'
            style={{ paddingRight: 0 }}
            required
          >
            <Select
              className={'tools-jcl-params-select'}
              options={[
                { label: '不记录', value: '不记录' },
                { label: '记录', value: '记录' },
              ]}
              disabled={团队增益快照 === '快照'}
              placeholder={'请选择解析时是否记录伤害数据'}
            />
          </Form.Item>
          <Form.Item
            className={'tools-jcl-form-item-full'}
            name='数据'
            label={
              <div className={'tools-jcl-form-label-3'}>
                <span>数据</span>
                <使用说明 />
              </div>
            }
            required
          >
            <Input.TextArea
              value={原始数据}
              onChange={(e) => 设置原始数据(e?.target?.value)}
              className={'tool-jcl-input-area'}
            />
          </Form.Item>
        </Form>
        <div className={'tools-jcl-btns'}>
          <Button type='primary' className='tools-jcl-btn' onClick={获取远程数据}>
            获取数据
          </Button>
          <Button danger disabled={!结果数据} className='tools-jcl-btn' onClick={save}>
            保存循环
          </Button>
          <Button disabled={!结果数据} className='tools-jcl-btn' onClick={copy}>
            复制
          </Button>
        </div>
        {结果数据 && (
          <div id='tools-jcl-result' className={'tools-jcl-result'}>
            {JSON.stringify(结果数据)}
          </div>
        )}
        <保存循环弹窗
          导入循环保存弹窗={导入循环保存弹窗}
          设置导入循环保存弹窗={设置导入循环保存弹窗}
          结果数据={结果数据}
          目标心法={目标心法}
          原始数据={原始数据}
        />
      </Spin>
    </div>
  )
}

export default JCL战斗记录解析
