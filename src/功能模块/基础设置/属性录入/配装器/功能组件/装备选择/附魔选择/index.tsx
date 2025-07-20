import { Select, SelectProps } from 'antd'
import React, { useState } from 'react'
import { 附魔数据类型 } from '@/@types/附魔'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { useAppDispatch, useAppSelector } from '@/hooks'
import 根据表单选项获取装备信息 from '../../../工具函数/根据表单选项获取装备信息'
import styles from './index.module.less'
import './index.css'

interface 附魔选择入参 extends SelectProps {
  list: 附魔数据类型[]
  form: any
  开启装备智能对比: boolean
  allValue?: any // 选择装备的全部信息包含附魔等
  部位索引: string
}

function 附魔选择(props: 附魔选择入参) {
  const { list, 开启装备智能对比, form, allValue, 部位索引, ...rest } = props

  const 当前计算结果 = useAppSelector((state) => state?.data?.当前计算结果)
  const [dpsUpList, setDpsUpList] = useState<{ uuid: string; dpsUp: number }[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // 获取dps提升装备列表
  const getDpsUpList = () => {
    if (开启装备智能对比) {
      setLoading(true)
      // 获取旧装备列表
      const 当前装备列表信息 = form?.getFieldsValue()
      const 当前装备信息 = 根据表单选项获取装备信息(当前装备列表信息)

      const { 秒伤: 旧秒伤 } = dispatch(秒伤计算({ 更新装备信息: 当前装备信息 }))

      // 传入新的装备
      const newDpsUpList = list.map((item) => {
        const 新装备数据 = {
          ...allValue,
          附魔: item?.附魔名称,
        }

        const 更新后装备信息 = 根据表单选项获取装备信息({
          ...当前装备列表信息,
          [`${部位索引}`]: 新装备数据,
        })

        const { 秒伤: 更新后秒伤 } = dispatch(秒伤计算({ 更新装备信息: 更新后装备信息 }))

        return {
          uuid: `${item?.附魔名称}${item?.附魔支持部位}` || '',
          dpsUp: 更新后秒伤 - (旧秒伤 || 当前计算结果?.秒伤),
        }
      })

      if (newDpsUpList?.length) {
        setDpsUpList(newDpsUpList)
      }
      setLoading(false)
    }
  }

  return (
    <Select
      placeholder='选择附魔'
      loading={loading}
      allowClear
      showSearch
      filterOption={(input, option) => {
        return option?.value?.toString()?.includes(input) || false
      }}
      popupMatchSelectWidth={开启装备智能对比 ? 240 : 200}
      optionFilterProp='label'
      onDropdownVisibleChange={(e) => {
        if (e) {
          getDpsUpList()
        } else {
          setDpsUpList([])
        }
      }}
      className='fumo-select'
      {...rest}
    >
      {list.map((item) => {
        const upItem = dpsUpList?.find(
          (up) => up.uuid === `${item?.附魔名称}${item?.附魔支持部位}`
        ) || {
          dpsUp: 0,
        }

        return (
          <Select.Option key={item.附魔名称} value={item.附魔名称} label={item.附魔名称}>
            <div className='fumo-diff-wrap'>
              <span>{item.附魔名称}</span>
              <div>
                {item?.挑战附魔 ? <span className={styles.callenge}>挑战</span> : null}
                {upItem?.dpsUp !== 0 ? (
                  <span
                    className={`zhuangbei-diff ${
                      upItem?.dpsUp > 0 ? 'dps-up-color' : 'dps-low-color'
                    }`}
                  >
                    {upItem?.dpsUp > 0 ? '+' : ''}
                    {upItem?.dpsUp}
                  </span>
                ) : null}
              </div>
            </div>
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default 附魔选择
