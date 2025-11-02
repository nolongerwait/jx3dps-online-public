import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 祝由_水坎 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '祝由_水坎')

  constructor(模拟循环) {
    super(模拟循环)
    祝由_水坎.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '祝由_水坎')
    this.初始化技能运行数据()
  }

  释放() {
    if (
      !this.模拟循环.当前自身buff列表?.['祝由释放允许']?.当前层数 ||
      !this.模拟循环.当前自身buff列表?.['卦象_水坎']?.当前层数
    ) {
      return { 可以释放: false, 异常信息: ERROR_ACTION.BUFF错误 }
    }

    return { 可以释放: true }
  }

  命中() {
    this.模拟循环.卸除buff({ 名称: '祝由释放允许', 卸除层数: 1 })
  }
}

export default 祝由_水坎

export const 祝由_火离类型 = typeof 祝由_水坎
