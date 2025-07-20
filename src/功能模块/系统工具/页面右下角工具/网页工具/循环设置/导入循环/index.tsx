import React, { useState } from 'react'
import { Alert, message, Modal, ModalProps, Spin, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 循环数据 } from '@/@types/循环'
import { 更新当前自定义循环列表 } from '@/store/data'
import { 数据埋点 } from '@/工具函数/tools/log'
import './index.css'
import CycleSelect from '@/组件/CycleSelect'

const { Dragger } = Upload

interface 导入弹窗类型 extends ModalProps {
  a?: string
}

const 导入弹窗: React.FC<导入弹窗类型> = (props) => {
  const { open, onCancel } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [导入数据, 设置导入数据] = useState<循环数据>()
  const [循环标识, 设置循环标识] = useState<string>()
  const dispatch = useAppDispatch()

  const 自定义循环列表 = useAppSelector((state) => state?.data?.自定义循环列表)

  const handleFileChange = (e) => {
    const file = e
    const reader = new FileReader()
    setLoading(true)
    reader.readAsText(file)
    reader.onload = () => {
      if (reader.result) {
        try {
          const data = JSON.parse(reader.result as any)
          if (data?.名称) {
            设置导入数据(data as any)
          } else {
            message.error('导入失败，请检查文件格式')
          }
        } catch (e) {
          message.error('导入失败，请检查文件格式')
        }
      }
      setLoading(false)
    }
  }

  const 导入循环数据 = (e) => {
    if (!循环标识) {
      message.error('请选择/输入循环标识')
      return
    }
    if (!导入数据) {
      message.error('请导入文件')
      return
    }
    数据埋点('导入循环')
    const 新自定义循环 = 自定义循环列表?.some((item) => item?.名称 === 循环标识)
      ? 自定义循环列表.map((item) => {
          return item.名称 === 循环标识 ? 导入数据 : item
        })
      : (自定义循环列表 || []).concat([导入数据])

    dispatch(更新当前自定义循环列表(新自定义循环))
    message.success('导入成功')
    onCancel?.(e as any)
  }

  return (
    <Modal open={open} onCancel={onCancel} title='导入循环' onOk={导入循环数据}>
      <Spin spinning={loading} tip='解析中'>
        <div className='cycle-setting-import-select-wrap'>
          <CycleSelect value={循环标识} onChange={设置循环标识} />
        </div>
        {导入数据?.名称 ? (
          <div className={'cycle-setting-import-res'}>
            <Alert
              type='success'
              message={`识别循环：${导入数据?.名称}`}
              closable
              afterClose={() => 设置导入数据(undefined)}
            />
          </div>
        ) : (
          <div>
            <Dragger
              name='file'
              fileList={[]}
              beforeUpload={(file) => {
                handleFileChange(file)
              }}
              className={'tools-daoru-dragger'}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>点击上传或拖拽上传循环JSON文件</p>
            </Dragger>
          </div>
        )}
      </Spin>
    </Modal>
  )
}

export default 导入弹窗
