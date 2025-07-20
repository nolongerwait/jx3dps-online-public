import React, { useContext } from 'react'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import styles from './index.module.less'
import ExportContext from '../context'

const { 系统配置 } = 获取当前数据()

const 图标区 = () => {
  const { 显示数据 } = useContext(ExportContext)

  return (
    <div className={styles.logoWrap}>
      <img className={styles.logo} src={系统配置?.心法图标} />
      <div className={styles.score}>{显示数据?.装分}</div>
    </div>
  )
}

export default 图标区
