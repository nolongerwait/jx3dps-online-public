import { 获取实际帧数 } from '@/工具函数/data'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 每秒郭氏帧 } from '@/数据/常量'

class 落笼簿 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '落笼簿')

  constructor(模拟循环) {
    super(模拟循环)
    落笼簿.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '落笼簿')
    this.初始化技能运行数据()
  }

  命中() {
    this.模拟循环.角色状态信息.状态 = this.模拟循环.角色状态信息.状态 === '本体' ? '傀儡' : '本体'
  }


  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['钤束', '虚影']),
    }
  }

}

export default 落笼簿

export const 落笼簿类型 = typeof 落笼簿
