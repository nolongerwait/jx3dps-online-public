import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 逸尘步虚 extends 有CD技能通用类 {
  // lua入口 19828
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '逸尘步虚')

  constructor(模拟循环) {
    super(模拟循环)
    逸尘步虚.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '逸尘步虚')
    this.初始化技能运行数据()
  }

  命中() {
    if (this.模拟循环.校验奇穴是否存在('凝气')) {
      this.模拟循环.技能类实例集合?.跃潮斩波?.减少调息时间?.(每秒郭氏帧 * 3)
    }
  }
}

export default 逸尘步虚

export const 逸尘步虚类型 = typeof 逸尘步虚
