import React, { useContext } from 'react'
import styles from './index.module.less'
import ExportContext from '../context'

const 标题区 = () => {
  const { 方案名称, 方案创建人, 方案备注 } = useContext(ExportContext)

  return (
    <div className={`${styles.titleWrap} ${方案备注 ? styles.withDesc : ''}`}>
      <h1 className={styles.name}>{方案名称 || '请在右侧输入配装名称'}</h1>
      <h1 className={styles.user}>{方案创建人}</h1>
      <h1 className={styles.desc}>{方案备注}</h1>
    </div>
  )
}

export default 标题区
