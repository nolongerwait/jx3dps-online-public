// import 循环主类 from '../main'
import { 按数字生成数组 } from '@/工具函数/help'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 待生效事件 } from '../../type'

class 一阳化生 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '一阳化生')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放后() {
    this.保存释放记录()
    this.模拟循环.添加buff?.({ 名称: '大招增伤', 对象: '自身' })

    if (this.模拟循环.大橙武模拟) {
      this.模拟循环.添加buff?.({ 名称: '大橙武增伤', 对象: '自身' })
    }

    this.触发伤害行为('一阳化生·悟', 1)
    this.技能回复能量(10, '任脉')
    this.技能回复能量(10, '督脉')
    const 数组 = 按数字生成数组(5)
    const 待生效事件队列: 待生效事件[] = []
    数组.forEach((item) => {
      待生效事件队列.push({
        事件名称: '一阳化生大招',
        事件时间: (this.模拟循环.当前时间 || 0) + 4.5 * item,
        事件备注: {
          技能名称: '一阳化生',
          当前次数: item,
        },
      })
    })
    this.模拟循环.添加待生效事件队列?.(待生效事件队列)

  }

  大招结算后续(当前次数) {
    this.触发伤害行为('一阳化生·悟', 1, [`无界_通用易伤_${20 * 当前次数}·1`, `无界_通用内功被会心_${20 * 当前次数}·1`])
    this.技能回复能量(10, '任脉')
    this.技能回复能量(10, '督脉')
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('大橙武增伤')
    this.本次释放记录 = {
      造成buff数据: 造成buff数据 ? 造成buff数据 : undefined,
      重要buff列表: this.获取当前重要buff列表(['大橙武增伤', '截阳无双', '读条增伤']),
    }
  }
}

export default 一阳化生

export const 一阳化生类型 = typeof 一阳化生
