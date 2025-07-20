import { Alert, App, Form, Input, Modal, Select, Tabs, Tooltip, message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新全部方案数据, 更新选中的方案数据 } from '@/store/data'
import { DEFAULT_PROJECT_NAME } from '@/数据/常量'
import './index.css'

interface SaveCustomProjectModalProps {
  自定义方案保存弹窗: boolean
  设置自定义方案保存弹窗: (e: boolean) => void
  保存自定义方案: (名称) => void
}

// 最多保存数量
const LIMIT_NUM = 15

function SaveCustomProjectModal(props: SaveCustomProjectModalProps) {
  const { modal } = App.useApp()
  const { 自定义方案保存弹窗, 设置自定义方案保存弹窗, 保存自定义方案 } = props
  // 保存类型，覆盖｜新增
  const [自定义方案类型, 设置自定义方案类型] = useState<string>()
  // 自定义方案名称保存输入
  const [自定义方案名称输入, 设置自定义方案名称输入] = useState<string>()
  // 保存类型，覆盖｜新增
  const [覆盖方案名, 设置覆盖方案名] = useState<string>()

  const 全部方案数据 = useAppSelector((state) => state?.data?.全部方案数据)
  const 当前方案名称 = useAppSelector((state) => state?.data?.当前方案名称)

  const dispatch = useAppDispatch()

  const 全部方案列表 = useMemo(() => {
    return Object.keys(全部方案数据).map((item) => {
      return 全部方案数据[item]
    })
  }, [全部方案数据])

  useEffect(() => {
    if (自定义方案保存弹窗) {
      if (全部方案列表?.length) {
        设置自定义方案类型('覆盖')
      } else {
        设置自定义方案类型('新增')
      }
    } else {
      设置自定义方案类型(undefined)
      设置自定义方案名称输入(undefined)
      设置覆盖方案名(undefined)
    }
  }, [自定义方案保存弹窗, 全部方案列表])

  const 保存自定义方案前 = () => {
    const 名称 = 自定义方案类型 === '覆盖' ? 覆盖方案名 : 自定义方案名称输入
    if (
      自定义方案类型 === '新增' &&
      全部方案列表?.some((item) => item?.方案名称 === 自定义方案名称输入)
    ) {
      message.error('已存在相同的方案名称，请更换')
      return
    }
    保存自定义方案(名称)
  }

  // 删除自定义方案
  const 删除方案前提示 = (e, 名称) => {
    e.stopPropagation()
    e.preventDefault()

    modal.confirm({
      title: `确定要删除方案【${名称}】吗?`,
      content: '删除后将无法恢复',
      okText: '我要删除',
      onOk: async () => {
        删除方案(名称)
      },
    })
  }

  const 删除方案 = (名称) => {
    const 新全部方案数据 = { ...全部方案数据 }
    delete 新全部方案数据[名称]

    dispatch(更新全部方案数据(新全部方案数据))

    if (当前方案名称 === 名称) {
      更新方案(DEFAULT_PROJECT_NAME)
    }
  }

  const 更新方案 = (e) => {
    dispatch(更新选中的方案数据(e))
  }

  return (
    <Modal
      centered
      title='保存自定义方案'
      okButtonProps={{
        disabled: !(自定义方案类型 === '覆盖' ? 覆盖方案名 : 自定义方案名称输入),
      }}
      open={自定义方案保存弹窗}
      onCancel={() => 设置自定义方案保存弹窗(false)}
      onOk={保存自定义方案前}
      destroyOnClose
      width={600}
      className={'project-custom-save-modal'}
    >
      <Alert
        type='success'
        style={{ marginBottom: 12 }}
        message='目前方案会保存当前的【装备信息】【奇穴信息】【增益信息】【选中的循环】'
      />
      <Tabs
        className={'project-custom-save-modal-content'}
        type='card'
        activeKey={自定义方案类型}
        onChange={设置自定义方案类型}
      >
        <Tabs.TabPane tab={'覆盖'} key='覆盖'>
          <Select
            value={覆盖方案名}
            onChange={设置覆盖方案名}
            optionLabelProp='label'
            placeholder={'请选择你要覆盖的方案'}
          >
            {全部方案列表.map((item) => {
              return (
                <Select.Option value={item.方案名称} key={item.方案名称} label={item.方案名称}>
                  <div className={'project-custom-save-label'}>
                    <span>{item.方案名称}</span>
                    {item.方案名称 !== DEFAULT_PROJECT_NAME ? (
                      <span
                        onClick={(e) => 删除方案前提示(e, item.方案名称)}
                        className={'project-custom-save-delete'}
                      >
                        删除
                      </span>
                    ) : null}
                  </div>
                </Select.Option>
              )
            })}
          </Select>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Tooltip
              title={全部方案列表?.length >= LIMIT_NUM ? `最多保存${LIMIT_NUM}个自定义方案` : ''}
            >
              新增
            </Tooltip>
          }
          key='新增'
          disabled={全部方案列表?.length >= LIMIT_NUM}
        >
          <Form>
            <Form.Item
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (value) {
                      if (全部方案数据?.[value]) {
                        callback('已存在相同的方案名，请更换')
                      }
                    }
                    callback()
                  },
                },
              ]}
            >
              <Input
                value={自定义方案名称输入}
                placeholder='请输入自定义方案名称'
                onChange={(e) => 设置自定义方案名称输入(e?.target?.value)}
              />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default SaveCustomProjectModal
