import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 列宿游 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '列宿游')

  constructor(模拟循环) {
    super(模拟循环)
    列宿游.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '列宿游')
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('列宿游')
    this.模拟循环.添加buff({ 名称: '明灯', 对象: '自身' })
    this.保存释放记录()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('明灯')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 列宿游

export const 列宿游类型 = typeof 列宿游
