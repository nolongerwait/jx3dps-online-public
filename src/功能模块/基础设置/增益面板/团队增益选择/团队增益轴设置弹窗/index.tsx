import React from 'react'
import { Alert, Button, Divider, Drawer, InputNumber, Switch, Tooltip } from 'antd'
import { useAppSelector } from '@/hooks'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import 团队增益图标 from '../团队增益图标'
import { 默认团队增益轴 } from '@/工具函数/init/默认数据'

const { 团队增益 } = 获取当前数据()

import './index.css'

function 团队增益轴设置弹窗({ open, onCancel, 修改团队增益轴 }) {
  const 增益数据 = useAppSelector((state) => state.data.增益数据)
  const 团队增益轴 = useAppSelector((state) => state.data.团队增益轴)

  const 修改增益轴 = (对应状态, 增益名称) => {
    const 新团队增益轴 = {
      ...团队增益轴,
      [增益名称]: {
        ...团队增益轴?.[增益名称],
        是否启用快照: 对应状态,
      },
    }
    修改团队增益轴(新团队增益轴)
  }

  const 切换全开全关 = (对应状态) => {
    const 新团队增益轴 = {}
    Object.keys(团队增益轴)?.forEach((增益名称) => {
      新团队增益轴[增益名称] = {
        ...团队增益轴[增益名称],
        是否启用快照: 对应状态,
      }
    })

    修改团队增益轴(新团队增益轴)
  }

  const 重置 = () => {
    const 新团队增益轴 = { ...默认团队增益轴 }
    修改团队增益轴(新团队增益轴)
  }

  return (
    <Drawer
      className='tuandui-zengyi-timeline-detail-modal'
      open={open}
      title={
        <div>
          团队增益轴设置
          <Button size='small' type='primary' style={{ marginLeft: 12 }} onClick={() => 重置()}>
            重置
          </Button>
          <Button
            size='small'
            type='primary'
            style={{ marginLeft: 12 }}
            onClick={() => 切换全开全关(true)}
          >
            一键全开
          </Button>
          <Button
            size='small'
            danger
            style={{ marginLeft: 12 }}
            onClick={() => 切换全开全关(false)}
          >
            一键全关
          </Button>
        </div>
      }
      placement='left'
      onClose={onCancel}
      footer={null}
      width={804}
      mask={false}
      destroyOnClose
    >
      <Alert
        type='info'
        className='tuandui-zengyi-timeline-info'
        message={
          <div>
            <p>开启快照后，会根据循环内的快照增益计算对应团队增益。关闭则启用均摊算法</p>
            <p>理论上使用该方式比均摊方式计算精确，尤其是部分职业对齐爆发的情况</p>
            <p>
              由于目前只能在录入循环时先设定时间轴，所以暂时不放开时间轴编辑，采用默认平均收集到的数据设置默认轴
            </p>
            <p>目前只有部分职业支持了快照计算</p>
          </div>
        }
      />
      <div className='tuandui-zengyi-timeline-collapse'>
        {团队增益
          .filter((item) => item.支持快照增益轴)
          .map((item) => {
            const 当前增益选项 = (增益数据?.团队增益 || []).find(
              (a) => item?.增益名称 === a?.增益名称
            )
            const 增益名称 = 当前增益选项?.增益名称 || ''
            const 轴数据 = 团队增益轴?.[增益名称]
            return (
              <div className={`tuandui-zengyi-timeline-detail-item`} key={item.增益名称}>
                <div className='tuandui-zengyi-timeline-header'>
                  <div className='tuandui-zengyi-timeline-checkbox-item'>
                    <团队增益图标 data={item} 当前数据={当前增益选项} />
                    <h1
                      className={`tuandui-zengyi-timeline-detail-title tuandui-zengyi-timeline-detail-title-disabled`}
                    >
                      {item.增益名称}
                    </h1>
                  </div>
                  <Switch
                    checkedChildren='快照'
                    unCheckedChildren='均摊'
                    checked={轴数据?.是否启用快照}
                    onChange={(e) => 修改增益轴(e, item.增益名称)}
                  />
                </div>
                <Divider className='tuandui-zengyi-timeline-detail-divider' />
                <div className='tuandui-zengyi-timeline-detail-content'>
                  <div className={'tuandui-zengyi-timeline-content-item'}>
                    <span className='tuandui-zengyi-timeline-content-item-title'>初次释放时间</span>
                    {/* <InputNumber
                      disabled={true}
                      className='tuandui-zengyi-timeline-content'
                      placeholder='请输入初次释放时间'
                      min={0}
                      value={轴数据?.初次释放时间}
                      precision={0}
                      max={1000000}
                      addonAfter={'帧'}
                      defaultValue={轴数据?.初次释放时间}
                    /> */}
                  </div>
                  {轴数据?.平均间隔 !== -1 ? (
                    <div className={'tuandui-zengyi-timeline-content-item'}>
                      <span className='tuandui-zengyi-timeline-content-item-title'>平均间隔</span>
                      <Tooltip title={`${(轴数据?.平均间隔 || 0) / 16}秒`}>
                        <InputNumber
                          disabled={true}
                          className='tuandui-zengyi-timeline-content'
                          placeholder='请输入平均间隔'
                          min={0}
                          value={轴数据?.平均间隔}
                          precision={0}
                          max={1000000}
                          addonAfter={'帧'}
                          defaultValue={轴数据?.平均间隔}
                        />
                      </Tooltip>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
      </div>
    </Drawer>
  )
}

export default 团队增益轴设置弹窗
