import React from 'react'
import { Tooltip } from 'antd'
import { 按数字生成数组 } from '@/工具函数/help'
import { 模拟信息类型, 角色状态信息类型 } from '../../../simulator/type'
import styles from './index.module.less'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
  模拟信息: 模拟信息类型
}

function Enerty(props: TitaiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={styles.content}>
      <div className={styles.wrap}>
        <div className={styles.title}>墨意</div>
        <Tooltip title={`墨意${角色状态信息?.墨意}点`}>
          <div className={styles.moyiWrap}>
            {按数字生成数组(12)?.map((a) => {
              return (
                <span
                  className={`${styles.moyiItem} ${
                    角色状态信息?.墨意 / 5 >= a ? styles.active : null
                  }`}
                  key={`墨意Key_${a}`}
                />
              )
            })}
            <span className={styles.moyiNum}>{角色状态信息?.墨意}</span>
          </div>
        </Tooltip>
      </div>
      <div className={styles.wrap}>
        <div className={styles.title}>临源</div>
        <Tooltip title={`临源豆：${角色状态信息?.临源豆}，临源充能：${角色状态信息?.临源充能}`}>
          <div className={styles.linyuan}>
            <div className={styles.linyuanDouWrap}>
              {按数字生成数组(4)?.map((a) => {
                return (
                  <span
                    className={`${styles.linyuanDouItem} ${
                      角色状态信息?.临源豆 >= a ? styles.active : null
                    }`}
                    key={`墨意Key_${a}`}
                  />
                )
              })}
            </div>
            <div className={styles.linyuanChongnengWrap}>
              {按数字生成数组(3)?.map((a) => {
                return (
                  <img
                    src={'https://icon.jx3box.com/icon/21978.png'}
                    className={`${styles.linyuanChongnengItem} ${
                      角色状态信息?.临源充能 >= a ? styles.active : null
                    }`}
                    key={`墨意Key_${a}`}
                  />
                )
              })}
            </div>
            <div className={styles.linyuanNum}>
              {角色状态信息?.临源豆}/{角色状态信息?.临源充能}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Enerty
