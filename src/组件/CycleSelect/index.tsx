import { useAppDispatch, useAppSelector } from '@/hooks'
import useCycle from '@/hooks/use-cycle'
import { PlusOutlined } from '@ant-design/icons'
import { App, Button, Divider, Input, message, Select } from 'antd'
import { forwardRef, useEffect, useState } from 'react'
import { 更新当前自定义循环列表 } from '@/store/data'
import classNames from 'classnames'
import './index.css'

interface CycleSelectProps {
  value?: string | undefined
  onChange?: (e: string | undefined) => void
  className?: string
}

const CycleSelect = forwardRef((props: CycleSelectProps, _) => {
  const { value: 循环标识, onChange: 设置循环标识, className } = props
  const { modal } = App.useApp()

  const { 全部循环 = [] } = useCycle()
  const [新建循环标识, 设置新建循环标识] = useState<string>()
  const 自定义循环列表 = useAppSelector((state) => state?.data?.自定义循环列表)
  const [可选循环列表, 设置可选循环列表] = useState<string[]>([])

  useEffect(() => {
    设置可选循环列表(自定义循环列表?.map((item) => item?.名称))
  }, [自定义循环列表])

  const dispatch = useAppDispatch()

  const 新增循环 = () => {
    if (!新建循环标识) {
      message.error('请输入循环唯一标识')
      return
    }
    if (全部循环?.some((item) => item?.名称 === 新建循环标识)) {
      message.error('和已存在循环唯一标识冲突，请更换标识')
      return
    }
    if (可选循环列表?.includes(新建循环标识)) {
      message.error('和已存在循环唯一标识冲突，请更换标识')
      return
    }
    设置可选循环列表([...可选循环列表, 新建循环标识])
    设置新建循环标识(undefined)
  }

  // 删除自定义循环
  const 删除循环前提示 = (e, 名称) => {
    e.stopPropagation()
    e.preventDefault()

    modal.confirm({
      title: `确定要删除循环【${名称}】吗?`,
      content: '删除后将无法恢复',
      okText: '我要删除',
      onOk: async () => {
        删除循环(名称)
      },
    })
  }

  const 删除循环 = (名称) => {
    dispatch(更新当前自定义循环列表(自定义循环列表.filter((item) => item.名称 !== 名称)))
    if (名称 === 循环标识) {
      设置循环标识?.(undefined)
    }
  }

  const cls = classNames(className)

  return (
    <Select
      style={{ width: '100%' }}
      value={循环标识}
      className={cls}
      onChange={设置循环标识}
      optionLabelProp='label'
      placeholder={'请选择你要覆盖的循环'}
      options={可选循环列表.map((item) => ({ label: item, value: item }))}
      optionRender={(option) => {
        return (
          <div className={'cycle-select-label-item'}>
            <span>{option.value}</span>
            <span
              onClick={(e) => 删除循环前提示(e, option.value)}
              className={'cycle-select-delete-btn'}
            >
              删除
            </span>
          </div>
        )
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div className='cycle-select-add-input-wrap'>
            <Input
              placeholder='请输入循环标识'
              value={新建循环标识}
              onChange={(e) => 设置新建循环标识(e?.target?.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onPressEnter={() => 新增循环()}
            />
            <Button type='text' icon={<PlusOutlined />} onClick={新增循环}>
              创建新循环
            </Button>
          </div>
        </>
      )}
    />
  )
})

export default CycleSelect
