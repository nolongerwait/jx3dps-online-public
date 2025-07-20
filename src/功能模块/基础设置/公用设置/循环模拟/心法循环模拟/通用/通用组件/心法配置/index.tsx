import React from 'react'
import { Buff枚举 } from '../../通用框架/类型定义/Buff'
import 开场Buff from './开场Buff'
import styles from './index.module.less'

interface 心法配置区类型 {
  配置区?: React.ReactNode
  原始Buff数据: Buff枚举
}

const 心法配置区: React.FC<心法配置区类型> = (props) => {
  const { 配置区, 原始Buff数据 } = props
  return (
    <div className={styles.wrap}>
      {原始Buff数据 ? <开场Buff 原始Buff数据={原始Buff数据} /> : null}
      {配置区 ? <div className={styles.config}>{配置区}</div> : null}
    </div>
  )
}

export default React.memo(心法配置区)
