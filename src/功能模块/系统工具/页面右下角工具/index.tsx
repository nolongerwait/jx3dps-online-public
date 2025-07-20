import { App } from 'antd'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新当前引导步骤, 更新新手引导流程状态, 更新背景图片显示状态 } from '@/store/system'
import { ClearLocalStorage } from '@/工具函数/tools/log'
import 数据迁移 from './数据迁移'
import DeveloperModal from './网页工具'
import 数据统计弹窗 from './数据统计弹窗'

import './index.css'

function 页面右下角工具() {
  const 背景图片显示状态 = useAppSelector((state) => state?.system?.背景图片显示状态)
  const dispatch = useAppDispatch()
  const [数据迁移弹窗, 设置数据迁移弹窗] = useState<boolean>(false)
  const [网页工具弹窗, 设置网页工具弹窗] = useState(false)
  const [数据统计弹窗展示, 设置数据统计弹窗] = useState(false)
  const proRef = useRef<any>(null)

  const { modal } = App.useApp()

  const clearCache = () => {
    modal.confirm({
      title:
        '⚠️警告，清除缓存将清空你的配装、增益等设置。清除后需重新配装。同时会清除在线链接其他门派的相同信息，请谨慎使用。',
      content: '仅作为计算数据异常、页面异常时使用。',
      onOk: () => {
        ClearLocalStorage()
      },
    })
  }

  const handleChangeBackground = () => {
    dispatch(更新背景图片显示状态(!背景图片显示状态))
  }

  const 开启新手引导 = () => {
    dispatch(更新新手引导流程状态(true))
    dispatch(更新当前引导步骤(0))
  }

  return (
    <div className='cache-wrapper'>
      <span className='cache-btn' onClick={() => 设置网页工具弹窗(true)}>
        网页工具
      </span>
      <span className='cache-btn' onClick={() => proRef?.current?.initKey()}>
        生成秘钥
      </span>
      <span className='cache-btn' onClick={() => 设置数据统计弹窗(true)}>
        数据统计
      </span>
      <span className='cache-btn' onClick={() => window?.open('/haste')}>
        加速工具
      </span>
      <a
        className='cache-btn'
        href='https://www.jx3box.com/bps/79885'
        target='_blank'
        rel='noreferrer'
      >
        问题反馈
      </a>
      <span className='cache-btn' onClick={() => 开启新手引导()}>
        新手引导
      </span>
      <span className='cache-btn' onClick={() => 设置数据迁移弹窗(true)}>
        数据迁移
      </span>
      <span className='cache-btn' onClick={handleChangeBackground}>
        {+(背景图片显示状态 || '') ? '关闭背景' : '开启背景'}
      </span>
      <span className='cache-btn' onClick={() => clearCache()}>
        清除缓存
      </span>
      <数据迁移 open={数据迁移弹窗} onCancel={() => 设置数据迁移弹窗(false)} />
      <DeveloperModal visible={网页工具弹窗} onClose={() => 设置网页工具弹窗(false)} />
      {数据统计弹窗展示 ? (
        <数据统计弹窗 open={数据统计弹窗展示} onCancel={() => 设置数据统计弹窗(false)} />
      ) : null}
    </div>
  )
}

export default 页面右下角工具
