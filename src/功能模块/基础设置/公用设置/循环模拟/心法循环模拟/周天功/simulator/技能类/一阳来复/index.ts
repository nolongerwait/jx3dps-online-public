import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 一阳来复 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '一阳来复')

  constructor(模拟循环) {
    super(模拟循环)

    一阳来复.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '一阳来复')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }

  减少调息时间(减少帧数) {
    const 待充能时间点 = this.技能运行数据.待充能时间点
    if (待充能时间点?.length) {
      const 新待充能时间点 = 待充能时间点
        .map((item) => {
          return item - 减少帧数
        })
        ?.filter((item) => {
          return item > this.模拟循环.当前时间
        })
      this.更新技能运行数据({ 待充能时间点: 新待充能时间点 })
    }
  }

  重置调息时间() {
    this.更新技能运行数据({ 待充能时间点: [] })
  }

  命中() {
    this.模拟循环.回复能量(50, '任脉')
    this.模拟循环.回复能量(50, '督脉')

    this.模拟循环?.技能类实例集合?.引窍?.减少调息时间(每秒郭氏帧 * 6)
    this.模拟循环?.技能类实例集合?.破穴?.减少调息时间(每秒郭氏帧 * 6)
  }
}

export default 一阳来复

export const 一阳来复类型 = typeof 一阳来复
