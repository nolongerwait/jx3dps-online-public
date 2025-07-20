import { Form, Input, message, Modal } from 'antd'
import React, { useContext } from 'react'
import ExportContext from '../context'
import styles from './index.module.less'

const prefix = 'https://jx3box.com/'

const 生成二维码弹窗 = (props) => {
  const { 设置自定义二维码链接, 设置自定义二维码标题 } = useContext(ExportContext)

  const [form] = Form.useForm()
  const 生成二维码 = () => {
    form.validateFields().then((values) => {
      if (values?.url?.includes('http') || values?.url?.includes('.')) {
        message.error('请输入正确的魔盒链接')
        return
      }
      const 完整链接 = `${prefix}${values?.url}`
      设置自定义二维码标题(values?.title)
      设置自定义二维码链接(完整链接)
      props?.onCancel?.()
    })
  }

  return (
    <Modal title={'生成二维码链接'} onOk={生成二维码} {...props}>
      <Form className={styles.codeForm} form={form} layout='vertical'>
        <Form.Item
          label='二维码说明'
          name='title'
          rules={[{ required: true, message: '请输入二维码说明' }]}
        >
          <Input placeholder='请输入' maxLength={10} />
        </Form.Item>
        <Form.Item
          label='二维码地址'
          name={'url'}
          rules={[{ required: true, message: '请输入二维码地址' }]}
        >
          <Input placeholder='请输入地址后缀' prefix={prefix} maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default 生成二维码弹窗
