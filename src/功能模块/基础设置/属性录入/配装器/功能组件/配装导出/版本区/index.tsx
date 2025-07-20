import React from 'react'
import styles from './index.module.less'
import log_data from '@/更新日志'

const 版本区 = () => {
  return (
    <div className={styles.versionWrap}>
      <span>{log_data?.[0]?.version}</span>
    </div>
  )
}

export default 版本区
