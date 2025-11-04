import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 风流云散 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '风流云散')

  constructor(模拟循环) {
    super(模拟循环)

    //
    风流云散.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '风流云散')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }

  // 这里单独写风流云散的卡GCD释放逻辑
  检查GCD(索引) {
    const 后一个技能 = this.模拟循环?.测试循环?.[索引 + 1]
    let GCD = this.模拟循环?.GCD组?.['风流云散'] || 0

    // 如果存在后面的技能，判断后面的技能当前的GCD为多少，推进到后一个技能。这样可以让灭卡在后面的技能释放前释放
    if (后一个技能) {
      const 当前技能 = this?.模拟循环?.技能基础数据?.find((item) => item?.技能名称 === 后一个技能)
      if (当前技能 && 当前技能?.技能GCD组) {
        const 技能实例 = this?.模拟循环?.技能类实例集合?.[当前技能?.技能名称]
        GCD = this.模拟循环?.检查GCD?.(当前技能, 技能实例, 索引 + 1) || 0
      }
    }
    return GCD
  }

  命中() {
    if (this.模拟循环.校验奇穴是否存在?.('出岫')) {
      this?.模拟循环?.添加buff({ 名称: '出岫', 对象: '自身' })
      // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    } else {
      // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
      // this?.模拟循环?.添加buff({ 名称: '云散', 对象: '自身' })
    }

    this.保存释放记录()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('出岫')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 风流云散

export const 风流云散类型 = typeof 风流云散
