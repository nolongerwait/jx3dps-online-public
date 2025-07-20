import { 装备属性信息模型 } from '@/@types/装备'

export interface 装备速查数据 extends 装备属性信息模型 {
  属性容量: number
  特效容量: number
  容量装分比?: number
}
