import 技能统一类 from '../../通用类/技能统一类'
import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import { 每秒郭氏帧 } from '@/数据/常量'

class 弱点击破 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '弱点击破')

  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    if (
      !this.模拟循环.当前目标buff列表?.['弱点']?.当前层数 ||
      this.模拟循环.当前目标buff列表?.['弱点内置CD']?.当前层数
    ) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.击破错误,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中(_) {
    this.保存释放记录()

    if (this.模拟循环.当前目标buff列表?.['弱点']?.当前层数) {
      this.模拟循环.技能类实例集合?.弱点?.击破弱点?.()
      this.模拟循环.技能类实例集合?.决?.减少调息时间?.(每秒郭氏帧 * 4)
    }

    this.模拟循环?.添加buff?.({ 名称: '弱点内置CD', 对象: '目标' })
  }

  保存释放记录() {
    this.本次释放记录 = {
      实际伤害技能: '前一个技能触发了击破',
    }
  }
}

export default 弱点击破

export const 弱点击破类型 = typeof 弱点击破
