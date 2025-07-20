import React, { useMemo, useState } from 'react'
import { Button, message, Select, Slider, Spin, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import 心法枚举 from '@/数据/静态数据/心法枚举.json'
import { 数据埋点 } from '@/工具函数/tools/log'
import { 按数字生成数组 } from '@/工具函数/help'
import Calculator from './Calculator'
import 图表展示 from './eventChart'
import './index.css'

const { Dragger } = Upload

function 触发率分析() {
  const [loading, setLoading] = useState<boolean>(false)
  const [文件内容, 设置文件内容] = useState<string[]>()
  const [shuju, setShuju] = useState<{ [key: string]: { [key: number]: number } }>()
  const [当前查看人, 设置当前查看人] = useState<string>()
  const [时间范围, 设置时间范围] = useState<number[]>()
  const [触发类型, 设置触发类型] = useState<number>(0)
  const [内置CD, 设置内置CD] = useState<number>(30)

  const [原始时间范围, 设置原始时间范围] = useState<number[]>()
  const [全部玩家信息, 设置全部玩家信息] = useState<any>({})

  const handleFileChange = (e) => {
    const file = e
    const reader: any = new FileReader()
    reader.readAsText(file, 'gbk')
    reader.onload = () => {
      if (reader.result) {
        const list = reader?.result?.split('\n')
        if (list.length > 0) {
          setLoading(true)
          设置文件内容(list)
          数据埋点('触发率分析')
          更新图表(list, 触发类型, 内置CD)
          setLoading(false)
        } else {
          message.error('解析错误，请检查文件')
        }
      }
    }
  }

  const 更新图表 = (传入文件内容, 传入触发类型, 传入内置CD) => {
    if (传入文件内容?.length) {
      const calculator = new Calculator()
      const res = calculator.call(传入文件内容, 传入触发类型, 传入内置CD)
      const { probs, players } = res
      setShuju(probs as any)
      设置当前查看人(Object.keys(probs)[0])
      设置全部玩家信息(players)
      const 第一个人的数据: any = Object.keys(Object.values(probs)[0] as any)
      if (第一个人的数据?.length) {
        const 第一帧 = 第一个人的数据?.[0]
        const 最后一帧 = 第一个人的数据?.[第一个人的数据?.length - 1]
        const 总时间 = Math.floor((最后一帧 - 第一帧) / 16)
        设置时间范围([0, 总时间])
        设置原始时间范围([0, 总时间])
      }
    }
  }

  const 均值 = useMemo(() => {
    if (当前查看人 && [0, 3]?.includes(触发类型)) {
      const 当前数据 = shuju?.[当前查看人]
      if (当前数据 && Object.keys(当前数据)?.length) {
        const 计算数据 = JSON.parse(JSON.stringify(当前数据))
        if (时间范围?.length) {
          const start = 时间范围[0] * 16 + (+Object.keys(当前数据)[0] || 0)
          const end = 时间范围[1] * 16 + (+Object.keys(当前数据)[0] || 0)
          Object.keys(当前数据).forEach((key) => {
            if (+key < start || +key > end) {
              delete 计算数据[key]
            }
          })
        }

        const arr: any[] = Object.values(计算数据)
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i]
        }

        return sum / arr.length
      } else {
        return 0
      }
    } else {
      return undefined
    }
  }, [shuju, 当前查看人, 时间范围, 触发类型])

  const 求和 = useMemo(() => {
    if (当前查看人 && [1, 2, 4]?.includes(触发类型)) {
      const 当前数据 = shuju?.[当前查看人]
      if (当前数据 && Object.keys(当前数据)?.length) {
        const 计算数据 = JSON.parse(JSON.stringify(当前数据))
        if (时间范围?.length) {
          const start = 时间范围[0] * 16 + (+Object.keys(当前数据)[0] || 0)
          const end = 时间范围[1] * 16 + (+Object.keys(当前数据)[0] || 0)
          Object.keys(当前数据).forEach((key) => {
            if (+key < start || +key > end) {
              delete 计算数据[key]
            }
          })
        }

        const arr: any[] = Object.values(计算数据)
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i]
        }

        return sum
      } else {
        return 0
      }
    } else {
      return undefined
    }
  }, [shuju, 当前查看人, 时间范围])

  return (
    <Spin spinning={loading} tip='解析中'>
      <div className='tools-event-chart-title'>
        <Select
          value={触发类型}
          className='tools-event-chart-select'
          onChange={(e) => {
            let 更新内置CD = 40
            设置触发类型(e)
            if (e === 1) {
              更新内置CD = 30
            } else if (e === 3) {
              更新内置CD = 30
            } else if (e === 4) {
              更新内置CD = 10
            }
            设置内置CD(更新内置CD)
            更新图表(文件内容, e, 更新内置CD)
          }}
        >
          <Select.Option key={'双会套装概率'} value={0}>
            门派套装双会
          </Select.Option>
          <Select.Option key={'橙武特效'} value={1}>
            橙武特效
          </Select.Option>
          <Select.Option key={'橙武子技能'} value={2}>
            橙武子技能
          </Select.Option>
          {/* <Select.Option key={'大附魔·腰'} value={3}>
            大附魔·腰
          </Select.Option> */}
          <Select.Option key={'大附魔·手'} value={4}>
            大附魔·手
          </Select.Option>
        </Select>
        {[1, 3, 4]?.includes(触发类型) ? (
          <Select
            value={内置CD}
            className='tools-event-chart-select'
            onChange={(e) => {
              设置内置CD(e)
              更新图表(文件内容, 触发类型, e)
            }}
            showSearch
          >
            {按数字生成数组(80)
              ?.filter((item) => item >= 10)
              .map((item) => {
                return (
                  <Select.Option key={`内置CD${item}`} value={item}>
                    {`内置CD ${item}秒`}
                  </Select.Option>
                )
              })}
          </Select>
        ) : null}
        {shuju ? (
          <Select
            className='tools-event-chart-select'
            value={当前查看人}
            placeholder='请选择查看人'
            allowClear
            onChange={(e) => {
              设置当前查看人(e)
            }}
          >
            {Object.keys(shuju).map((item) => {
              // 找到对应的数据
              const 玩家数据 = 全部玩家信息?.[当前查看人 || '']
              const 心法ID = 玩家数据?.kungfu_id
              const 心法图标 = 心法枚举?.[心法ID]?.icon
              return (
                <Select.Option key={item} value={item}>
                  <div className='tools-event-chart-select-item'>
                    {心法图标 ? (
                      <img
                        src={心法图标}
                        className='tools-event-chart-select-item-img'
                        alt={心法ID}
                      />
                    ) : null}
                    {item?.replaceAll(`"`, '')}
                  </div>
                </Select.Option>
              )
            })}
          </Select>
        ) : null}
      </div>
      <div>
        {文件内容 ? (
          <div>
            <div className='tools-event-chart-title'>
              <Button
                danger
                onClick={() => {
                  setShuju(undefined)
                  设置文件内容(undefined)
                  设置当前查看人(undefined)
                  设置时间范围(undefined)
                  设置原始时间范围(undefined)
                }}
              >
                清空
              </Button>
              {均值 !== undefined ? (
                <span className='tools-event-chart-text '>
                  均值：
                  <span className='tools-event-chart-average'>{均值?.toFixed(6)}</span>
                </span>
              ) : (
                ''
              )}
              {求和 !== undefined ? (
                <>
                  <span className='tools-event-chart-text '>
                    期望总次数：
                    <span className='tools-event-chart-average'>{求和?.toFixed(6)}</span>
                  </span>
                  {时间范围?.[1] && 时间范围?.[1] > 0 ? (
                    <span className='tools-event-chart-text '>
                      分均次：
                      <span className='tools-event-chart-average'>
                        {((求和 / 时间范围?.[1]) * 60)?.toFixed(6)}
                      </span>
                    </span>
                  ) : null}
                </>
              ) : (
                ''
              )}
              {原始时间范围?.length && 当前查看人 ? (
                <>
                  <span className='tools-event-chart-text'>时间范围：</span>
                  <Slider
                    value={时间范围}
                    range
                    className='tools-event-chart-setting'
                    onChange={(e) => {
                      设置时间范围(e)
                    }}
                    max={原始时间范围?.[1]}
                    min={原始时间范围?.[0]}
                    step={1}
                    included
                  />
                  <span className='tools-event-chart-text'>{时间范围?.[1] || 0}秒</span>
                </>
              ) : null}
            </div>
            {触发类型 === 1 ? (
              <p className='tools-event-chart-title-tip'>
                注：部分心法橙武特效触发内置CD非30秒，需手动修改
              </p>
            ) : null}
            {当前查看人 && shuju ? (
              <>
                <图表展示
                  key={`${当前查看人}${触发类型}${内置CD}`}
                  当前查看人={当前查看人}
                  data={shuju?.[当前查看人]}
                />
                <p className='tools-event-chart-tip'>
                  {[2]?.includes(触发类型)
                    ? '横坐标：帧，纵坐标：该帧对应技能的期望个数'
                    : [1, 4]?.includes(触发类型)
                    ? '横坐标：帧，纵坐标：对应buff触发概率'
                    : '横坐标：帧，纵坐标：有对应buff的概率'}
                </p>
              </>
            ) : null}
          </div>
        ) : (
          <Dragger
            name='file'
            fileList={[]}
            beforeUpload={(file) => {
              handleFileChange(file)
            }}
            className={'tools-chufalv-dragger'}
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>点击上传JCL文件</p>
          </Dragger>
        )}
      </div>
    </Spin>
  )
}

export default 触发率分析
