import { useState } from 'react'
import { Modal } from 'antd'
import { 获取角色需要展示的面板数据 } from '@/功能模块/基础设置/面板信息/工具'
import { useAppSelector } from '@/hooks'

import { 获取配装背景图片 } from './util'
import ExportContext from './context'
import 导出配置 from './导出配置'
import 图标区 from './图标区'
import 标题区 from './标题区'
import 属性区 from './属性区'
import 奇穴区 from './奇穴区'
import 秒伤区 from './秒伤区'
import 装备区 from './装备区'
import 版本区 from './版本区'
import 二维码区 from './二维码区'

import styles from './index.module.less'

const 配装导出 = (props) => {
  const { visible, onClose, 当前装备信息, 更换装备后秒伤, 获取表单信息 } = props

  const [方案名称, 设置方案名称] = useState<string | undefined>(undefined)
  const [方案备注, 设置方案备注] = useState<string | undefined>(undefined)
  const [方案创建人, 设置方案创建人] = useState<string | undefined>(undefined)
  const [是否展示伤害, 设置是否展示伤害] = useState<boolean>(true)
  const [自定义二维码链接, 设置自定义二维码链接] = useState<string | undefined>(undefined)
  const [自定义二维码标题, 设置自定义二维码标题] = useState<string | undefined>(undefined)

  const 当前奇穴信息 = useAppSelector((state) => state?.data?.当前奇穴信息)
  const 增益数据 = useAppSelector((state) => state?.data?.增益数据)
  const 装备信息 = useAppSelector((state) => state?.data?.装备信息)
  const 增益启用 = useAppSelector((state) => state?.data?.增益启用)

  const 显示数据 = visible
    ? 获取角色需要展示的面板数据({
        装备信息: 当前装备信息 || 装备信息,
        当前奇穴信息,
        增益数据,
        增益启用,
        显示增益后面板: false,
      })
    : {}

  return (
    <Modal
      title={
        <div className={styles.titleWrap}>
          <div className={styles.title}>导出配装方案</div>
          <span className={styles.notice}>本功能静态资源来源魔盒，已获得授权</span>
        </div>
      }
      footer={null}
      width={1368}
      open={visible}
      centered
      onCancel={() => onClose?.()}
    >
      <ExportContext.Provider
        value={{
          方案名称,
          设置方案名称,
          方案备注,
          设置方案备注,
          方案创建人,
          设置方案创建人,
          是否展示伤害,
          设置是否展示伤害,
          显示数据,
          当前装备信息,
          更换装备后秒伤,
          自定义二维码链接,
          设置自定义二维码链接,
          自定义二维码标题,
          设置自定义二维码标题,
          获取表单信息,
        }}
      >
        <div className={styles.content}>
          <div
            className={styles.left}
            id={'export_pz_content'}
            style={{ backgroundImage: `url(${获取配装背景图片()})` }}
          >
            <图标区 />
            <版本区 />
            <标题区 />
            <属性区 />
            <奇穴区 />
            <秒伤区 />
            <装备区 />
            <二维码区 />
          </div>
          <div className={styles.right}>
            <导出配置 />
          </div>
        </div>
      </ExportContext.Provider>
    </Modal>
  )
}

export default 配装导出
