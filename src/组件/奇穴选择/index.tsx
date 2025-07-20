import { forwardRef, useState } from 'react'
import 奇穴选择抽屉 from '@/功能模块/基础设置/公用设置/奇穴选择/drawer'
import './index.css'

interface 奇穴选择类型 {
  value?: string[]
  onChange?: (e: string[]) => void
}

const 奇穴选择: React.FC<奇穴选择类型> = forwardRef((props) => {
  const { value, onChange } = props
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <div className='component-qixue-select-value'>
        {value?.length ? (
          value?.join(',')
        ) : (
          <span className='component-qixue-select-value-empty'>请选择数据</span>
        )}
        <a className='component-qixue-select-value-btn' onClick={() => setOpen(true)}>
          设置奇穴
        </a>
      </div>
      <奇穴选择抽屉
        value={value || []}
        onChange={onChange}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
})

export default 奇穴选择
