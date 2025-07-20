import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 雾刃飞光 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '雾刃飞光')

  constructor(模拟循环) {
    super(模拟循环)

    //
    雾刃飞光.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '雾刃飞光')

    this.初始化技能运行数据()
  }

  释放() {
    return
  }
}

export default 雾刃飞光

export const 雾刃飞光类型 = typeof 雾刃飞光
