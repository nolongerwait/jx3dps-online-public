import { 属性类型 } from '@/@types/属性'

export interface 镶嵌孔数据类型 {
  镶嵌类型: 属性类型
  镶嵌索引?: 属性类型[]
  各等级增益数据: Array<{
    镶嵌等级: number
    增益数值: number
  }>
}
