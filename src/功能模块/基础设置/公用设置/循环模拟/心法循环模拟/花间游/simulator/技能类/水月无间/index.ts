import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 水月无间 extends 有CD技能通用类 {
  // scripts/skill/万花\万花_养心决_水月无间.lua
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '水月无间')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
    水月无间.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '水月无间')
  }

  命中() {
    this.模拟循环?.添加buff({ 名称: '布散畅和', 对象: '自身' })
    this.模拟循环?.添加buff({ 名称: '水月无间', 对象: '自身' })

    this.墨意变化(20)
    this.保存释放记录()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('布散畅和')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 水月无间

export const 水月无间类型 = typeof 水月无间
