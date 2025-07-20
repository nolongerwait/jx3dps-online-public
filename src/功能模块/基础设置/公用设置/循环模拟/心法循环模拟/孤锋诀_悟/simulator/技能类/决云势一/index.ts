import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 决云势一 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '决云势·悟·一')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  造成伤害() {
    const 当前流血层数 =
      this.模拟循环?.技能类实例集合?.流血?.DOT运行数据?.待生效数据?.[0]?.当前层数 || 0
    const buff列表: string[] = []

    if (当前流血层数 > 0) {
      buff列表.push(`流血增伤·${当前流血层数}`)
    }

    this.触发伤害行为('决云势·悟·一', 1, buff列表)
  }

  释放后() {
    this.保存释放记录()
    this.减少绝技技能CD()
    this.对阵招式橙武减少绝技技能CD()
    const 当前锐意 = this.模拟循环.角色状态信息?.锐意 || 0
    if (当前锐意 >= 30) {
      this.触发消耗锐意(30, '决云势·悟·一')
      this.模拟循环.添加buff?.({ 名称: '决链', 对象: '自身' })
    }
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

export default 决云势一

export const 停云势类型 = typeof 决云势一
