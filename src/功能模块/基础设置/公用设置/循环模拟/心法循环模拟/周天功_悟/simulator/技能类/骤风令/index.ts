// import 循环主类 from '../main'
import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 骤风令 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '骤风令')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放后() {
    this.保存释放记录()
    this.触发伤害行为('骤风令·悟', 2)
    this.减少绝技技能CD(每秒郭氏帧 * 2)
    this.对阵招式橙武减少绝技技能CD()
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['大橙武增伤', '截阳无双']),
    }
  }
}

export default 骤风令

export const 截阳类型 = typeof 骤风令
