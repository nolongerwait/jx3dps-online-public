import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 胧雾观花 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '胧雾观花')

  constructor(模拟循环) {
    super(模拟循环)

    胧雾观花.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '胧雾观花')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }

  命中() {
    // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    this.模拟循环?.技能造成伤害('胧雾观花', 1, [])
  }
}

export default 胧雾观花

export const 胧雾观花类型 = typeof 胧雾观花
