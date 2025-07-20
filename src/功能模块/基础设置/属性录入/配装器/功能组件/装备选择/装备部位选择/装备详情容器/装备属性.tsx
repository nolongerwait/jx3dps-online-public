import { memo } from 'react'
import { 装备属性信息模型 } from '@/@types/装备'
import styles from './index.module.less'
import { 属性简写枚举 } from '@/@types/枚举'
import { 精炼加成系数算法 } from '../../../../工具函数/根据装备信息获取基础属性'
import { Tag } from 'antd'

interface 装备属性类型 {
  装备数据: 装备属性信息模型
  当前装备信息: any
}

const 装备属性: React.FC<装备属性类型> = (props) => {
  const { 装备数据, 当前装备信息 } = props

  return (
    <div className={styles.data}>
      <h1 className={styles.title}>属性</h1>
      <div className={styles.dataContent}>
        {获取属性列表(装备数据)
          ?.filter((a) => a?.名称 !== '体质')
          ?.map((item, index) => {
            return (
              <div key={index} className={styles.dataItem}>
                {/* <div className={styles.dataItemLabel}>{item?.名称}</div> */}
                <Tag
                  className={styles.attrLabel}
                  color={ColorMap?.[item?.名称]}
                >
                  {item?.名称}
                </Tag>
                <Tag className={styles.dataItemValueNum}>
                  <div className={styles.dataItemValueWrap}>{item?.数值}</div>
                  {item?.名称 !== '武伤' ? (
                    <span className={styles.dataItemValueText}>
                      {`+ ${
                        精炼加成系数算法(
                          item?.数值,
                          当前装备信息?.当前精炼等级
                        ) - item?.数值
                      }`}
                    </span>
                  ) : null}
                </Tag>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default memo(装备属性)

const ColorMap = {
  体质: 'magenta',
  攻击: 'red',
  力道: 'purple',
  身法: 'purple',
  根骨: 'purple',
  元气: 'purple',
  会心: 'orange',
  会效: 'gold',
  破防: 'lime',
  破招: 'green',
  无双: 'cyan',
  加速: 'blue',
  武伤: 'geekblue',
  全能: 'purple',
}

const 获取属性列表 = (装备: 装备属性信息模型) => {
  const 列表: any[] = []
  if (装备?.武器伤害_最大值) {
    列表.push({
      名称: '武伤',
      数值: `${装备?.武器伤害_最小值 || 0} ～ ${装备?.武器伤害_最大值 || 0}`,
    })
  }
  装备?.装备增益?.forEach((item) => {
    if (属性简写枚举[item?.属性]) {
      列表.push({
        名称: 属性简写枚举[item?.属性],
        数值: item?.值,
      })
    } else {
      console.error('属性简写枚举没有找到对应属性', item?.属性, 装备)
    }
  })
  return 列表
}
