import 循环模拟技能基础数据 from '../../../constant/skill'
import { 待生效事件 } from '../../type'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 飞鸿破野 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '飞鸿破野')

  constructor(模拟循环) {
    super(模拟循环)

    飞鸿破野.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '飞鸿破野')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }

  命中() {
    this?.延迟触发飞鸿()
    this?.延迟触发破野()
  }

  延迟触发飞鸿() {
    const 待生效事件: 待生效事件[] = []
    const 触发时间 = [2, 3, 4, 5]
    for (let i = 0; i < 触发时间.length; i++) {
      // 假设为5帧
      const 事件时间 = this.模拟循环.当前时间 + (触发时间[i] || 0)
      待生效事件.push({
        事件名称: `飞鸿触发`,
        事件时间: 事件时间,
        事件备注: {},
      })
    }
    this.模拟循环.添加待生效事件队列(待生效事件)
  }

  延迟触发破野() {
    const 待生效事件: 待生效事件[] = [
      {
        事件名称: `破野触发`,
        事件时间: this.模拟循环.当前时间 + 18,
        事件备注: {},
      },
    ]
    this.模拟循环.添加待生效事件队列(待生效事件)
  }

  飞鸿触发() {
    this.触发伤害行为('飞鸿')
  }

  破野触发() {
    this.触发伤害行为('破野')
  }
}

export default 飞鸿破野

export const 飞鸿破野类型 = typeof 飞鸿破野
