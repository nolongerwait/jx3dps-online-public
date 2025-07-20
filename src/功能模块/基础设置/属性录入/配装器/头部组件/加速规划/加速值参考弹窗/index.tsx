// 加速规划
import { Button, Modal, Radio, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import './index.css'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 按数字生成数组 } from '@/工具函数/help'
import { 获取阈值 } from '@/页面/加速计算/utils'
import { 加速档位信息 } from '@/@types/装备'

const { 加速档位 = {} } = 获取当前数据()

type 所有加速信息 = Record<string, 加速档位信息[]>

function 加速值参考弹窗(props) {
  const { onCancel, 设置目标加速, ...rest } = props

  const [当前查看类型, 设置当前查看类型] = useState<string>('1.5秒GCD')

  const 获取GCD加速档位 = (原始帧数) => {
    const res: 加速档位信息[] = []
    const 阈值: any = 获取阈值(原始帧数, 5)
    按数字生成数组(6)?.forEach((index) => {
      const 档位 = index - 1
      const 实际时间 = 原始帧数 - 档位
      res.push({
        加速档位: 档位,
        加速值: 阈值?.[档位],
        实际时间: 实际时间 / 16,
      })
    })
    return res
  }

  const 所有数据 = useMemo(() => {
    let res: 所有加速信息 = {
      '1.5秒GCD': 获取GCD加速档位(24),
      '1秒GCD': 获取GCD加速档位(16),
    }
    if (Object.keys(加速档位)?.length) {
      res = { ...res, ...加速档位 }
    }
    return res
  }, [获取GCD加速档位, 加速档位])

  const 当前展示加速段位 = useMemo(() => {
    return 所有数据?.[当前查看类型 || '']
  }, [所有数据, 当前查看类型])

  const 设为目标 = (目标加速) => {
    设置目标加速(目标加速)
    onCancel()
  }

  return (
    <Modal
      title={
        <div className={'haste-project-modal-title'}>
          <span>加速值参考</span>
        </div>
      }
      maskClosable={false}
      centered
      width={670}
      footer={false}
      onCancel={onCancel}
      {...rest}
    >
      <div className={'haste-project-help-wrap'}>
        <Radio.Group
          className={'haste-project-help-radio'}
          value={当前查看类型}
          onChange={(e) => 设置当前查看类型(e?.target?.value)}
        >
          {Object.keys(所有数据)?.map((加速类型) => {
            return (
              <Radio.Button value={加速类型} key={加速类型}>
                {加速类型}
              </Radio.Button>
            )
          })}
        </Radio.Group>
        <Table
          size='small'
          dataSource={当前展示加速段位}
          pagination={false}
          scroll={{ y: 400 }}
          columns={[
            {
              key: '加速档位',
              title: '加速档位',
              dataIndex: '加速档位',
            },
            {
              key: '加速值',
              title: '加速值',
              dataIndex: '加速值',
            },
            {
              key: '实际时间',
              title: '实际时间',
              dataIndex: '实际时间',
            },
            {
              key: '操作',
              title: '操作',
              dataIndex: '操作',
              render: (value, row) => {
                return row?.加速值 > 0 ? (
                  <Button size='small' type='primary' onClick={() => 设为目标(row?.加速值)}>
                    设为目标
                  </Button>
                ) : (
                  '-'
                )
              },
            },
          ]}
        />
      </div>
    </Modal>
  )
}

export default 加速值参考弹窗
