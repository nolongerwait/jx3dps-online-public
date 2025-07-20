import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新选中的方案数据 } from '@/store/data'
import { Select } from 'antd'
import { 触发秒伤计算 } from '@/计算模块/计算函数'

function 方案选择() {
  const dispatch = useAppDispatch()
  const 当前方案名称 = useAppSelector((state) => state?.data?.当前方案名称)
  const 全部方案数据 = useAppSelector((state) => state?.data?.全部方案数据)

  const 切换方案 = (e) => {
    dispatch(更新选中的方案数据(e))
    dispatch(触发秒伤计算({ 是否更新显示计算结果: true }))
  }

  return (
    <div className='common-item' id='Guide_11'>
      <h1 className='common-label'>方案</h1>
      <div className='common-content'>
        <Select
          className='current-project'
          value={当前方案名称}
          onChange={(v) => {
            切换方案(v)
          }}
        >
          {Object.keys(全部方案数据).map((item) => {
            return (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}

export default 方案选择
