import { 循环详情 } from '@/@types/循环'
import './indes.css'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

interface 循环详情配置类型 {
  data?: 循环详情
  onEdit: () => void
  onDelete: () => void
}

const 循环详情配置 = (props: 循环详情配置类型) => {
  const { data, onDelete, onEdit } = props

  return (
    <div className='cycle-setting-cycle-item'>
      <div>
        <span className='cycle-setting-cycle-item-span'>
          战斗时间：
          <span className='cycle-setting-cycle-item-value'>{data?.战斗时间}</span>
        </span>
        <span className='cycle-setting-cycle-item-span'>
          加速等级：
          <span className='cycle-setting-cycle-item-value'>{data?.循环加速等级 || '无要求'}</span>
        </span>
        <span className='cycle-setting-cycle-item-span'>
          延迟要求：
          <span className='cycle-setting-cycle-item-value'>{data?.循环延迟要求 || '无要求'}</span>
        </span>
      </div>
      <span>
        <Tooltip title='编辑该循环组'>
          <FormOutlined className='cycle-setting-cycle-item-edit' onClick={onEdit} />
        </Tooltip>
        <Tooltip title='删除该循环组'>
          <DeleteOutlined className='cycle-setting-cycle-item-delete' onClick={onDelete} />
        </Tooltip>
      </span>
    </div>
  )
}

export default 循环详情配置
