import { Modal, ModalProps, Radio, Select, Tooltip } from 'antd'
import React, { useState } from 'react'
import dataJson from './data.json'
import styles from './index.module.less'
import 排名趋势表 from './排名趋势表'
import 四分位表 from './四分位表'
import './index.css'
interface 数据统计弹窗类型 extends ModalProps {
  open: boolean
  onCancel: () => void
}

function 数据统计弹窗(props: 数据统计弹窗类型) {
  const { open, onCancel } = props
  const [数据源, 设置数据源] = useState(Object.keys(dataJson)?.[0])
  const [排序规则, 设置排序规则] = useState<string | number>(3)

  const 排序规则数组 = [
    {
      type: 'low',
      value: 0,
      label: '前80%',
    },
    {
      type: 'q1',
      value: 1,
      label: '前60%',
    },
    {
      type: 'median',
      value: 2,
      label: '前40%',
    },
    {
      type: 'q3',
      value: 3,
      label: '前20%',
    },
    {
      type: 'high',
      value: 4,
      label: '前5%',
    },
    {
      type: 'max',
      value: 'max',
      label: '最大值',
    },
  ]

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <div className={styles.header}>
          <div className={styles.name}>
            <h1 className={styles.title}>数据统计</h1>
            <p className={styles.tip}>
              数据来源官方微博/魔盒，只提供筛选功能，无任何数据加工。百强数据样本较少，仅供娱乐。
            </p>
          </div>
          <div className={styles.content}>
            <Select
              className={styles.select}
              value={数据源}
              onChange={设置数据源}
              options={Object.keys(dataJson).map((item) => {
                return {
                  value: item,
                  label: `${item}`,
                }
              })}
            />
            <Radio.Group value={排序规则} onChange={(e) => 设置排序规则(e?.target?.value)}>
              {排序规则数组.map((item) => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    <Tooltip
                      title={item.value === 'max' ? `按最大值排序` : `按${item.label}中位数排序`}
                    >
                      {item.label}
                    </Tooltip>
                  </Radio.Button>
                )
              })}
              <Radio.Button key={'排名趋势'} value={'排名趋势'}>
                {'排名趋势'}
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
      width={'80%'}
      centered
      footer={false}
    >
      <div className={styles.watermark}>
        {open ? (
          排序规则 === '排名趋势' ? (
            <排名趋势表 数据源={数据源} 排序规则数组={排序规则数组} />
          ) : (
            <四分位表 数据源={数据源} 排序规则={排序规则} key={`${数据源}${排序规则}`} />
          )
        ) : null}
      </div>
    </Modal>
  )
}

export default 数据统计弹窗
