import { App, FloatButton } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新当前引导步骤, 更新新手引导流程状态, 更新背景图片显示状态 } from '@/store/system'
import { ClearLocalStorage } from '@/工具函数/tools/log'
import {
  ApiOutlined,
  DesktopOutlined,
  DockerOutlined,
  FieldTimeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SlidersOutlined,
  ToolOutlined,
  WindowsOutlined,
} from '@ant-design/icons'

import 数据迁移 from './数据迁移'
import DeveloperModal from './网页工具'
import 数据统计弹窗 from './数据统计弹窗'

import styles from './index.module.less'

function 页面右下角工具() {
  const 背景图片显示状态 = useAppSelector((state) => state?.system?.背景图片显示状态)
  const dispatch = useAppDispatch()
  const [数据迁移弹窗, 设置数据迁移弹窗] = useState<boolean>(false)
  const [网页工具弹窗, 设置网页工具弹窗] = useState(false)
  const [数据统计弹窗展示, 设置数据统计弹窗] = useState(false)
  const [悬浮弹窗展示, 设置悬浮弹窗展示] = useState(false)

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
    <>
      <FloatButton.Group
        trigger='click'
        className={styles.floatBtnGroup}
        shape='square'
        open={悬浮弹窗展示}
        onOpenChange={(e) => 设置悬浮弹窗展示(e)}
        icon={<SettingOutlined id='Guide_15' />}
        style={{
          width: 100,
          insetInlineEnd: 24,
          bottom: 24,
          fontSize: 12,
          opacity: 0.95,
        }}
      >
        <FloatButton
          className={styles.floatBtn}
          icon={<ToolOutlined />}
          description='网页工具'
          onClick={() => {
            设置悬浮弹窗展示(false)
            设置网页工具弹窗(true)
          }}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<SlidersOutlined />}
          description='数据统计'
          onClick={() => {
            设置悬浮弹窗展示(false)
            设置数据统计弹窗(true)
          }}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<FieldTimeOutlined />}
          description='加速工具'
          onClick={() => window?.open('/haste')}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<QuestionCircleOutlined />}
          description='问题反馈'
          onClick={() => window?.open('https://www.jx3box.com/bps/79885')}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<WindowsOutlined />}
          description='新手教程'
          onClick={() => {
            设置悬浮弹窗展示(false)
            开启新手引导()
          }}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<DockerOutlined />}
          description='数据迁移'
          onClick={() => {
            设置悬浮弹窗展示(false)
            设置数据迁移弹窗(true)
          }}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<DesktopOutlined />}
          description={+(背景图片显示状态 || '') ? '关闭背景' : '开启背景'}
          onClick={handleChangeBackground}
        />
        <FloatButton
          className={styles.floatBtn}
          icon={<ApiOutlined style={{ color: 'red' }} />}
          description={<span style={{ color: 'red' }}>清空缓存</span>}
          onClick={() => {
            设置悬浮弹窗展示(false)
            clearCache()
          }}
        />
      </FloatButton.Group>
      <数据迁移 open={数据迁移弹窗} onCancel={() => 设置数据迁移弹窗(false)} />
      <DeveloperModal visible={网页工具弹窗} onClose={() => 设置网页工具弹窗(false)} />
      {数据统计弹窗展示 ? (
        <数据统计弹窗 open={数据统计弹窗展示} onCancel={() => 设置数据统计弹窗(false)} />
      ) : null}
    </>
  )
}

export default 页面右下角工具
