import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 朔风扬尘一 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '朔风扬尘一')

  constructor(模拟循环) {
    super(模拟循环)

    //
    朔风扬尘一.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '朔风扬尘一')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }

  命中() {
    this.模拟循环?.添加buff({ 名称: '朔风扬尘', 对象: '自身', 新增层数: 7 })
  }
}

export default 朔风扬尘一

export const 朔风扬尘一段类型 = typeof 朔风扬尘一
