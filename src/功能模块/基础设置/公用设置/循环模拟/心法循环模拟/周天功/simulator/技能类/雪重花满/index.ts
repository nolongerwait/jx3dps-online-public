import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 雪重花满 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '雪重花满')

  constructor(模拟循环) {
    super(模拟循环)

    //
    雪重花满.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '雪重花满')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }
}

export default 雪重花满

export const 雪重花满类型 = typeof 雪重花满
