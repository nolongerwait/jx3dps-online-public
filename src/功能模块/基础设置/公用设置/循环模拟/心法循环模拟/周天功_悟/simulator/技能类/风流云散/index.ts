// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 风流云散 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '风流云散')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  检查GCD(索引) {
    const 后一个技能 = this.模拟循环?.测试循环?.[索引 + 1]
    let GCD = this.模拟循环?.GCD组?.['风流云散'] || 0

    if (后一个技能) {
      const 当前技能 = this?.模拟循环?.技能基础数据?.find((item) => item?.技能名称 === 后一个技能)
      if (当前技能 && 当前技能?.技能GCD组) {
        const 技能实例 = this?.模拟循环?.技能类实例集合?.[当前技能?.技能名称]
        GCD = this.模拟循环?.检查GCD?.(当前技能, 技能实例, 索引 + 1) || 0
      }
    }
    const 延迟等待 = this.模拟循环?.当前时间 ? (this.模拟循环?.网络延迟 || 0) : 0
    return GCD - 延迟等待
  }


  释放后() {
    this.保存释放记录()
    this.模拟循环.添加buff?.({ 名称: '游风', 对象: '自身' })
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('游风')
    this.本次释放记录 = {
      造成buff数据: 造成buff数据 ? 造成buff数据 : undefined,
      重要buff列表: this.获取当前重要buff列表(['游风']),
    }
  }
}

export default 风流云散

export const 风流云散类型 = typeof 风流云散
