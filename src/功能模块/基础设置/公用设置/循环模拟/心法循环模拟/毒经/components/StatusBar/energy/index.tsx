import React, { useMemo } from 'react'
import { Tooltip } from 'antd'
import { 角色状态信息类型 } from '../../../simulator/type'
import styles from './index.module.less'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Energy(props: TitaiProps) {
  const { 角色状态信息 } = props

  const 虫魄状态 = useMemo(() => {
    return [
      { src: 'https://icon.jx3box.com/icon/2783.png', 名称: '蝎心', 是否激活: 角色状态信息.虫魄状态.蝎心 },
      { src: 'https://icon.jx3box.com/icon/2785.png', 名称: '蛇影', 是否激活: 角色状态信息.虫魄状态.蛇影 },
      { src: 'https://icon.jx3box.com/icon/2786.png', 名称: '百足', 是否激活: 角色状态信息.虫魄状态.百足 },
      { src: 'https://icon.jx3box.com/icon/2787.png', 名称: '千丝', 是否激活: 角色状态信息.虫魄状态.千丝 },
      { src: 'https://icon.jx3box.com/icon/2784.png', 名称: '蟾啸', 是否激活: 角色状态信息.虫魄状态.蟾啸 },
    ]
  }, [角色状态信息])

  return (
     <div className={styles.content}>
      <Tooltip title={'每种“千劫万毒手”招式命中时会获得对应“虫魄”，集齐五种时会自动消耗所有“虫魄”并对目标造成5段毒性伤害与破招伤害。'}>
        <div className={styles.title}>
          虫魄状态
        </div>
      </Tooltip>
      <div className={styles.wrap}>
        {虫魄状态?.map((item) => {
          return (
            <img src={item.src} style={{ filter: item.是否激活 ? 'none' : 'grayscale(1)' }} key={item.名称} className={styles.item} />
          )
        })}
      </div>
     </div>
  )
}

export default Energy
