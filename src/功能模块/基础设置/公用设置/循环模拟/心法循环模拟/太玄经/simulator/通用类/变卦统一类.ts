import 有CD技能通用类 from './有CD技能通用类'

class 变卦统一类 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  统一变卦生效(当前存在祝由释放允许) {
    // 变卦无法主动获得，只能刷新
    if (当前存在祝由释放允许) {
      this.模拟循环.添加buff({ 名称: '祝由释放允许', 对象: '自身' })
    }
    if (this.模拟循环.校验奇穴是否存在('荧入白')) {
      this.模拟循环.添加buff({ 名称: '荧入白', 对象: '自身' })
    }
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('荧入白')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 变卦统一类

export const 变卦类型 = typeof 变卦统一类
