import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 物化天行 extends 有CD技能通用类 {
  // lua入口 20049
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '物化天行 ')

  constructor(模拟循环) {
    super(模拟循环)
    物化天行.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '物化天行 ')
    this.初始化技能运行数据()
  }

  命中() {
    this.物化天行物化效果()

    this.保存释放记录()
  }

  物化天行物化效果() {
    this.模拟循环.角色状态信息.体态 = '物化天行'
    this.模拟循环.添加buff?.({ 名称: '物化天行', 对象: '自身' })
    this.模拟循环?.技能类实例集合?.['飘遥伞击']?.刷新伞击序列()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('物化天行')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }

  释放后() {
    // 设置飞行保护时间
    this.模拟循环.GCD组.公共 = (this.模拟循环.GCD组.公共 || 0) + 5
  }
}

export default 物化天行

export const 物化天行类型 = typeof 物化天行
