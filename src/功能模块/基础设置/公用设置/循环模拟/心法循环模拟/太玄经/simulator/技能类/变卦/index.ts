import 循环模拟技能基础数据 from '../../../constant/skill'
import 变卦统一类 from '../../通用类/变卦统一类'

class 变卦 extends 变卦统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '变卦')

  constructor(模拟循环) {
    super(模拟循环)
    变卦.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '变卦')
    this.初始化技能运行数据()
  }
}

export default 变卦

export const 起卦类型 = typeof 变卦
