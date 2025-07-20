import { Checkbox, Col, Divider, Modal, Row } from 'antd'
import React, { useMemo } from 'react'
import { 装备位置部位枚举 } from '@/@types/装备'

const 全部部位: 装备位置部位枚举[] = Object.keys(装备位置部位枚举) as 装备位置部位枚举[]

const 遍历寻优跳过弹窗 = (props) => {
  const { 当前选择计算部位, 更新当前选择计算部位, open, onCancel } = props

  const 是否选择部分 = useMemo(() => {
    return !!(当前选择计算部位?.length && 当前选择计算部位?.length < 全部部位?.length)
  }, [当前选择计算部位, 全部部位])

  const 是否全选 = useMemo(() => {
    return !全部部位?.some((key) => !当前选择计算部位?.includes(key))
  }, [当前选择计算部位, 全部部位])

  return (
    <Modal
      title={'需计算的装备部位'}
      footer={false}
      open={open}
      width={460}
      onCancel={() => onCancel()}
    >
      <div className={'max-fumo-all-check'}>
        <Checkbox
          indeterminate={是否选择部分}
          onChange={() => {
            if (是否全选) {
              更新当前选择计算部位([])
            } else {
              更新当前选择计算部位(全部部位)
            }
          }}
          checked={是否全选}
        >
          全选
        </Checkbox>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <Checkbox.Group value={当前选择计算部位} onChange={(e) => 更新当前选择计算部位(e as any)}>
        <Row>
          {全部部位.map((key) => {
            return (
              <Col className={'max-fumo-check-col'} span={6} key={key}>
                <Checkbox value={key}>{装备位置部位枚举[key]}</Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    </Modal>
  )
}

export default 遍历寻优跳过弹窗
