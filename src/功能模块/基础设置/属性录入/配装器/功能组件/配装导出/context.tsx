import { 装备信息数据类型 } from '@/@types/装备'
import { 角色基础属性类型 } from '@/@types/角色'
import React from 'react'

interface ExportContextProps {
  方案名称: string | undefined
  设置方案名称: (e: string) => void
  方案备注: string | undefined
  设置方案备注: (e: string) => void
  方案创建人: string | undefined
  设置方案创建人: (e: string) => void
  是否展示伤害: boolean
  设置是否展示伤害: (e: boolean) => void
  显示数据: Partial<角色基础属性类型>
  当前装备信息: 装备信息数据类型
  更换装备后秒伤: number
  自定义二维码链接: string | undefined
  设置自定义二维码链接: (e: string | undefined) => void
  自定义二维码标题: string | undefined
  设置自定义二维码标题: (e: string | undefined) => void
  获取表单信息: () => void
}

const ExportContext = React.createContext<ExportContextProps>({} as any)

export default ExportContext
