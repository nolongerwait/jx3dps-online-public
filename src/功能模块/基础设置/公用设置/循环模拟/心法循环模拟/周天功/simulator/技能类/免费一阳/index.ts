import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 免费一阳 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '免费一阳')

  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    if (!this.模拟循环.当前自身buff列表?.['来复']?.当前层数) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中() {
    this.模拟循环.技能类实例集合?.一阳来复?.命中()
    this.模拟循环.卸除buff?.({ 名称: '来复', 对象: '自身' })
  }
}

export default 免费一阳

export const 免费一阳类型 = typeof 免费一阳
