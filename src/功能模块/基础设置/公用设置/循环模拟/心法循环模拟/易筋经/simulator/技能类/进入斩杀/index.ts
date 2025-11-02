import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 进入斩杀 extends 有CD技能通用类 {

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this.模拟循环.添加buff?.({ 名称: '斩杀状态', 对象: '目标', 新增层数: 1 })
  }
}

export default 进入斩杀

export const 进入斩杀类型 = typeof 进入斩杀
