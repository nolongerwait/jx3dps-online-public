import 循环模拟技能基础数据 from '../../../constant/skill'
import 起卦统一类 from '../../通用类/起卦统一类'

class 起卦 extends 起卦统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '起卦')

  出卦(卦象) {
    this.解卦(卦象)
  }

  constructor(模拟循环) {
    super(模拟循环)
    起卦.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '起卦')
    this.初始化技能运行数据()
  }
}

export default 起卦

export const 起卦类型 = typeof 起卦
