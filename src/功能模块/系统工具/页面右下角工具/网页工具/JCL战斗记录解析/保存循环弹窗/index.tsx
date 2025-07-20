import { Form, Input, message, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 更新当前自定义循环列表 } from '@/store/data'
import { 循环数据, 循环详情 } from '@/@types/循环'
import CycleSelect from '@/组件/CycleSelect'
import 奇穴选择 from '@/组件/奇穴选择'
import 秘籍选择 from '../../循环设置/循环详情弹窗/秘籍选择'
import { 心法枚举 } from '../tool'

import './index.css'

const { 缓存映射 } = 获取当前数据()

interface 保存循环弹窗类型 {
  导入循环保存弹窗: boolean
  设置导入循环保存弹窗: (e: boolean) => void
  结果数据: 循环详情 | undefined
  目标心法: string
  原始数据: string | undefined
}

function 保存循环弹窗(props: 保存循环弹窗类型) {
  const { 导入循环保存弹窗, 设置导入循环保存弹窗, 结果数据, 目标心法 } = props

  const 自定义循环列表 = useAppSelector((state) => state?.data?.自定义循环列表)
  const 当前奇穴信息 = useAppSelector((state) => state?.data?.当前奇穴信息)
  const 当前秘籍信息 = useAppSelector((state) => state?.data?.当前秘籍信息)

  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (导入循环保存弹窗) {
      form?.setFieldsValue({
        循环名称: undefined,
        循环标题: undefined,
        奇穴设置: 当前奇穴信息,
        秘籍设置: 当前秘籍信息,
      })
    }
  }, [导入循环保存弹窗, 当前秘籍信息, 当前奇穴信息, 自定义循环列表, 目标心法, 结果数据])

  const 保存导入循环前 = () => {
    form?.validateFields()?.then((values) => {
      const 循环名称 = values?.循环名称
      const 保存循环: 循环数据 = {
        名称: values?.循环名称,
        标题: values?.循环标题 || values?.循环名称,
        类型: '自定义',
        标记: '导入',
        奇穴: values?.奇穴设置 || 当前奇穴信息,
        秘籍: values?.秘籍设置 || 当前秘籍信息,
        循环详情: [结果数据 as any],
      }

      const 新自定义循环 = 自定义循环列表?.some((item) => item?.名称 === 循环名称)
        ? 自定义循环列表.map((item) => {
            return item.名称 === 循环名称 ? 保存循环 : item
          })
        : (自定义循环列表 || []).concat([保存循环])

      dispatch(更新当前自定义循环列表(新自定义循环))

      message.success('保存成功')
      设置导入循环保存弹窗(false)
    })
  }

  useEffect(() => {
    // redux变动，更新storage信息
    const 保存信息 = {}
    ;(自定义循环列表 || []).forEach((item) => {
      保存信息[item.名称] = {
        ...item,
      }
    })
    localStorage?.setItem(缓存映射.自定义循环, JSON.stringify(保存信息))
  }, [自定义循环列表])

  return (
    <Modal
      centered
      title='保存导入循环'
      open={导入循环保存弹窗}
      onCancel={() => 设置导入循环保存弹窗(false)}
      onOk={保存导入循环前}
      width={1000}
      destroyOnClose
      className={'jcl-import-cycle-save-modal'}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='循环名称'
          label='循环名称(唯一)'
          required
          rules={[{ required: true, message: '请创建/选择循环名称(唯一)' }]}
        >
          <CycleSelect />
        </Form.Item>
        <Form.Item name='循环标题' label='循环标题'>
          <Input maxLength={20} placeholder='请输入循环标题，不输入则默认为循环名称' />
        </Form.Item>
        <Form.Item
          name='秘籍设置'
          label={
            <div>
              <span>秘籍设置</span>
            </div>
          }
        >
          <秘籍选择 />
        </Form.Item>
        <Form.Item
          name='奇穴设置'
          label={
            <div>
              <span>奇穴设置</span>
              <span style={{ color: 'red', marginLeft: 8, fontSize: 12 }}>
                因该解析方式无法获取奇穴，需重新手动选择
              </span>
            </div>
          }
        >
          <奇穴选择 />
        </Form.Item>
        {/* <Form.Item name='快照设置' label={'快照设置'}>
          <Checkbox.Group>
            {快照类型数据
              ?.filter((item) => {
                if (item === '含章挺秀阵') {
                  return 目标心法 === '周天功'
                }
                return true
              })
              ?.map((item) => {
                return (
                  <Checkbox key={`快照${item}`} value={item}>
                    {item}
                  </Checkbox>
                )
              })}
          </Checkbox.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export const 判断快照计算 = (目标心法, 结果数据) => {
  const 心法数据枚举 = 心法枚举[目标心法]
  const 套装Buff名称 = 心法数据枚举?.门派套装buff?.[0]
  const 快照列表: string[] = []
  const 数据字符串 = JSON.stringify(结果数据 || '{}')
  if (套装Buff名称) {
    if (数据字符串?.includes(套装Buff名称)) {
      快照列表.push('套装会心会效')
    }
  }
  if (数据字符串?.includes('大附魔_伤腰')) {
    快照列表.push('大附魔_伤腰')
  }
  if (数据字符串?.includes('风特效')) {
    快照列表.push('风特效')
  }
  if (数据字符串?.includes('含章挺秀阵')) {
    快照列表.push('含章挺秀阵')
  }
  if (数据字符串?.includes('朝圣')) {
    快照列表.push('朝圣')
  }
  if (数据字符串?.includes('圣浴明心')) {
    快照列表.push('圣浴明心')
  }
  if (数据字符串?.includes('号令三军')) {
    快照列表.push('号令三军')
  }
  if (数据字符串?.includes('仙王蛊鼎')) {
    快照列表.push('仙王蛊鼎')
  }
  if (数据字符串?.includes('寒啸千军')) {
    快照列表.push('寒啸千军')
  }

  return 快照列表
}

export default 保存循环弹窗
