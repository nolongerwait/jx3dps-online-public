import { Modal, Tabs } from 'antd'
import React, { useMemo, useState } from 'react'
import './index.css'

// const JCL技能序列导入 = React.lazy(() => import('./JCL技能序列导入'))
const JCL战斗记录解析 = React.lazy(() => import('./JCL战斗记录解析'))
const 奇穴导入 = React.lazy(() => import('./奇穴导入'))
const 循环设置 = React.lazy(() => import('./循环设置'))
const 装备速查 = React.lazy(() => import('./装备速查'))
const 技能系数 = React.lazy(() => import('./技能系数'))
const 触发率分析 = React.lazy(() => import('./触发率分析'))
const 循环伤害校验 = React.lazy(() => import('./循环伤害校验'))
const 截断时间获取 = React.lazy(() => import('./截断时间获取'))

function DeveloperModal({ visible, onClose }) {
  const [activeKey, setActiveKey] = useState<string>('JCL战斗记录解析')

  const CycleComponent = useMemo(() => {
    return activeKey === 'JCL战斗记录解析' ? (
      <JCL战斗记录解析 />
    ) : activeKey === '奇穴导入' ? (
      <奇穴导入 />
    ) : activeKey === '循环设置' ? (
      <循环设置 />
    ) : activeKey === '装备速查' ? (
      <装备速查 />
    ) : activeKey === '技能系数' ? (
      <技能系数 />
    ) : activeKey === '触发率分析' ? (
      <触发率分析 />
    ) : activeKey === '循环伤害校验' ? (
      <循环伤害校验 />
    ) : activeKey === '截断时间获取' ? (
      <截断时间获取 />
    ) : (
      ''
    )
  }, [activeKey])

  const hrefDev = location.href?.includes('localhost')
  const DEV = hrefDev

  const items = [
    {
      label: 'JCL战斗记录解析',
      key: 'JCL战斗记录解析',
      children: <React.Suspense>{CycleComponent}</React.Suspense>,
    },
    {
      label: '循环设置',
      key: '循环设置',
      children: <React.Suspense>{CycleComponent}</React.Suspense>,
    },
    {
      label: '装备速查',
      key: '装备速查',
      children: <React.Suspense>{CycleComponent}</React.Suspense>,
    },
    ...(DEV
      ? [
          {
            label: '奇穴导入',
            key: '奇穴导入',
            children: <React.Suspense>{CycleComponent}</React.Suspense>,
          },
          {
            label: '技能系数',
            key: '技能系数',
            children: <React.Suspense>{CycleComponent}</React.Suspense>,
          },
          {
            label: '循环伤害校验',
            key: '循环伤害校验',
            children: <React.Suspense>{CycleComponent}</React.Suspense>,
          },
          {
            label: '截断时间获取',
            key: '截断时间获取',
            children: <React.Suspense>{CycleComponent}</React.Suspense>,
          },
          {
            label: '触发率分析',
            key: '触发率分析',
            children: <React.Suspense>{CycleComponent}</React.Suspense>,
          },
        ]
      : []),
  ]

  return (
    <Modal
      className='tools-modal'
      title={'网页工具'}
      centered
      width={'100%'}
      open={visible}
      onCancel={() => onClose(false)}
      footer={null}
      destroyOnClose
    >
      <Tabs
        activeKey={activeKey}
        onChange={(e) => setActiveKey(e)}
        items={items}
        destroyInactiveTabPane
      />
    </Modal>
  )
}

export default DeveloperModal
