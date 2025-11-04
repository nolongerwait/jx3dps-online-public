// import 循环主类 from '../main'
import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 断脉 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '断脉')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放后() {
    this.保存释放记录()
    this.模拟循环.添加buff?.({ 名称: '断脉秘籍', 对象: '自身' })
    this.触发伤害行为('断脉·悟', 2)
    this.模拟循环.卸除buff?.({ 名称: '一阳指增伤', 对象: '自身' })
    this.技能回复能量(30, '任脉')
    this.减少绝技技能CD(每秒郭氏帧 * 1)
    this.减少轻功技能CD(每秒郭氏帧 * 1)
    this.对阵招式橙武减少绝技技能CD()
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['大橙武增伤', '截阳无双']),
    }
  }
}

export default 断脉

export const 断脉类型 = typeof 断脉
