import { 每秒郭氏帧 } from '@/数据/常量'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 待生效事件 } from '../../type'
import 循环模拟技能基础数据 from '../../../constant/skill'

class 倾波 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '倾波 ')
  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this.倾波触发()
  }

  倾波触发() {
    if (!this?.模拟循环?.当前自身buff列表?.['倾波']?.当前层数) {
      this.模拟循环?.添加buff({ 名称: '倾波', 对象: '自身' })
      this.倾波延迟事件()
    }
  }

  倾波延迟事件() {
    const 待生效事件: 待生效事件[] = [{
      事件名称: `倾波爆炸`,
      事件时间: this.模拟循环?.当前时间 + 每秒郭氏帧 * 1.5,
      事件备注: {},
    }]
    this.模拟循环.添加待生效事件队列(待生效事件)
  }

  倾波爆炸() {
    this.触发伤害行为('倾波')
  }
}

export default 倾波

export const 倾波类型 = typeof 倾波
