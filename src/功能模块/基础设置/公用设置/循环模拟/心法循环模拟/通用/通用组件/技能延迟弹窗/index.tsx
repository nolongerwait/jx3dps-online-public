import { 按数字生成数组 } from '@/工具函数/help'
import { Modal, ModalProps, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'

interface DelaySettingModalProps extends ModalProps {
  默认值?: number | 'GCD'
  保存: (e: number | 'GCD' | undefined) => void
  等待最大值?: number
}

const DelaySettingModal: React.FC<DelaySettingModalProps> = (props) => {
  const { 保存, 默认值, open, 等待最大值 = 24, ...rest } = props
  const [延迟设置, 设置延迟设置] = useState<number | 'GCD' | undefined>('GCD')

  useEffect(() => {
    if (open) {
      if (默认值) {
        设置延迟设置(默认值)
      } else {
        设置延迟设置(undefined)
      }
    }
  }, [open, 默认值])

  // 提交前获取信息

  const beforeOnOk = (e) => {
    保存(延迟设置)
    props?.onCancel?.(e)
  }

  const Options = useMemo(() => {
    let list: any[] = [{ label: '推迟至下个技能GCD转好', value: 'GCD' }]
    const minList = 按数字生成数组(等待最大值)?.map((key) => {
      return {
        label: `${key}帧`,
        value: key,
      }
    })
    minList.sort((a, b) => b.value - a.value)
    list = list.concat(minList)
    return list
  }, [等待最大值])

  return (
    <Modal open={open} title={'使用延迟添加'} onOk={beforeOnOk} {...rest}>
      <h1 className={styles.delayModalTitle}>请选择延迟</h1>
      <Select
        className={styles.delayModalSelect}
        allowClear
        value={延迟设置}
        onChange={设置延迟设置}
        options={Options}
        placeholder='请设置要延迟的时间，未设置则不延迟'
      />
      {/* <p className={styles.delayTipe}>注意，选择后的帧数如果超过了下个技能的GCD，将按GCD计算</p> */}
    </Modal>
  )
}

export default DelaySettingModal
