import { 通用循环模拟技能基础数据 } from '../通用技能定义'
import 有CD技能通用类 from '../通用类/有CD技能通用类'

class 特效腰椎 extends 有CD技能通用类 {
  static 技能数据 = 通用循环模拟技能基础数据?.find((item) => item.技能名称 === '特效')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.模拟循环.添加buff?.({ 名称: '风特效_英雄_快照', 对象: '自身', 新增层数: 1 })
    this.模拟循环.添加buff?.({ 名称: '风特效_快照', 对象: '自身', 新增层数: 1 })

    this.保存释放记录()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('风特效_英雄_快照')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 特效腰椎

export const 特效类型 = typeof 特效腰椎
