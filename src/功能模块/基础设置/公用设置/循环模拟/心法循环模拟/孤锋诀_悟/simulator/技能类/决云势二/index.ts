// import 循环主类 from '../main'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 决云势二 extends 技能统一类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    const 决链层数 = this.模拟循环.当前自身buff列表?.['决链']?.当前层数

    if (!决链层数) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    }
  }

  造成伤害() {
    const 当前流血层数 =
      this.模拟循环?.技能类实例集合?.流血?.DOT运行数据?.待生效数据?.[0]?.当前层数 || 0
    const buff列表: string[] = []

    if (当前流血层数 > 0) {
      buff列表.push(`流血增伤·${当前流血层数}`)
    }

    this.触发伤害行为('决云势·悟·二', 1, buff列表)
  }

  释放后() {
    this.保存释放记录()
    this.对阵招式橙武减少绝技技能CD()
    this.模拟循环.卸除buff?.({ 名称: '决链', 对象: '自身' })
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表([
        '灭影追风·悟',
        '披靡·悟',
        '横云一式',
        '大橙武增伤',
        '流血增伤',
      ]),
    }
  }
}

export default 决云势二

export const 停云势类型 = typeof 决云势二
