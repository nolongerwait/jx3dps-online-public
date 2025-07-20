import React from 'react'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { useAppSelector } from '@/hooks'
import styles from './index.module.less'

const { 奇穴数据 } = 获取当前数据()

const 奇穴区 = () => {
  const 当前奇穴信息 = useAppSelector((state) => state?.data?.当前奇穴信息)
  const 增益启用 = useAppSelector((state) => state?.data?.增益启用)

  const 完整样式显示 = !增益启用

  return (
    <div className={`${styles.qixueWrap} ${完整样式显示 ? styles.full : ''}`}>
      {完整样式显示 ? <div className={styles.qixueTitle}>奇 穴</div> : null}
      <div className={styles.qixueContent}>
        {当前奇穴信息.map((item, index) => {
          const 图片 = 奇穴数据?.[index]?.奇穴列表?.find((a) => a?.奇穴名称 === item)?.奇穴图片
          const 前两位 = item?.substring(0, 2)
          return (
            <div className={styles.item} key={`export_qixue_${item}`}>
              <img className={styles.img} src={图片} />
              <h1 className={styles.title}>{前两位}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default 奇穴区
