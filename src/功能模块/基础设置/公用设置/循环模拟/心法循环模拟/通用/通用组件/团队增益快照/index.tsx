import React from 'react'
import { Checkbox } from 'antd'
import { useAppSelector } from '@/hooks'
import { CloseCircleFilled } from '@ant-design/icons'
import 团队增益图标 from './团队增益图标'
import './index.css'

interface 团队增益快照类型 {
  启用: boolean
  设置是否启用: (e: boolean) => void
  当前时间: number // 当前时间 用于buff的展示
}

const 团队增益快照: React.FC<团队增益快照类型> = (props) => {
  const { 启用, 设置是否启用, 当前时间 } = props
  const 团队增益轴 = useAppSelector((state) => state?.data?.团队增益轴)
  return (
    <div className={'cycle-simulator-team-buff-checkbox'}>
      <Checkbox checked={启用} onChange={(e) => 设置是否启用(e.target.checked)}>
        启用团队增益快照
      </Checkbox>
      {启用 ? (
        <div className='cycle-simulator-team-buff-wrap'>
          {Object.keys(团队增益轴)
            ?.filter((key) => key !== '弘法')
            ?.map((增益名称) => {
              return (
                <团队增益图标
                  增益轴数据={团队增益轴[增益名称]}
                  增益名称={增益名称}
                  当前时间={当前时间}
                  key={`快照时间轴${增益名称}`}
                />
              )
            })}
          <CloseCircleFilled
            className='cycle-simulator-team-buff-icon'
            onClick={() => 设置是否启用(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(团队增益快照)
