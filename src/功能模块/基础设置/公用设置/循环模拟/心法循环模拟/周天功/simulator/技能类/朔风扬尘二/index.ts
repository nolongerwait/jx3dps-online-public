import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 朔风扬尘二 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '朔风扬尘二')

  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    if (!this.模拟循环.当前自身buff列表?.['朔风扬尘']?.当前层数) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中() {
    // 只卸除层数不刷新时间
    if (this.模拟循环.当前自身buff列表?.['朔风扬尘']?.当前层数) {
      const 当前层数 = this.模拟循环.当前自身buff列表?.['朔风扬尘']?.当前层数 || 1
      this.模拟循环.当前自身buff列表['朔风扬尘'] = {
        ...this.模拟循环.当前自身buff列表?.['朔风扬尘'],
        当前层数: 当前层数 - 1,
      }
    }

    this.模拟循环?.添加buff({ 名称: '扬尘', 对象: '自身', 新增层数: 1 })
    this.模拟循环?.添加buff({ 名称: '扬尘增伤', 对象: '自身', 新增层数: 1 })
    this.模拟循环.回复能量(5, '任脉')
    this.模拟循环.回复能量(5, '督脉')

    const 当前扬尘层数 = this?.模拟循环?.当前自身buff列表['扬尘增伤']?.当前层数 || 0

    const 当前扬尘伤害等级 = 1 + 当前扬尘层数

    this.触发伤害行为('朔风扬尘', 1, [], undefined, 当前扬尘伤害等级 || 1)

    if (当前扬尘层数 === 7) {
      this.模拟循环?.卸除buff({ 名称: '扬尘增伤', 对象: '自身', 卸除层数: 7 })
    }
  }
}

export default 朔风扬尘二

export const 朔风扬尘二类型 = typeof 朔风扬尘二
