// import 循环主类 from '../main'
import { 获取实际帧数 } from '@/工具函数/data'
import 循环模拟技能基础数据 from '../../../constant/skill'
import { 待生效事件 } from '../../type'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 一阳指 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '一阳指')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  获取读条时间() {
    return 获取实际帧数(一阳指.技能数据?.读条时间, this.模拟循环.加速值)
  }

  读条(读条开始时间) {
    const 待生效事件队列: 待生效事件[] = []
    const 读条帧数 = this.获取读条时间()

    待生效事件队列.push({
      事件名称: '一阳指读条',
      事件时间: 读条开始时间 + 读条帧数,
      事件备注: {
        技能名称: '一阳指',
      },
    })
    this.模拟循环.添加待生效事件队列?.(待生效事件队列)
  }

  读条结束后() {
    this.保存释放记录()
    this.模拟循环.添加buff?.({ 名称: '读条增伤', 对象: '自身' })
    this.模拟循环.添加buff?.({ 名称: '一阳指增伤', 对象: '自身' })
    this.触发伤害行为('一阳指·悟', 1)
    this.技能回复能量(20, '任督')
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['大橙武增伤', '读条增伤', '截阳无双']),
    }
  }
}

export default 一阳指

export const 一阳指类型 = typeof 一阳指
