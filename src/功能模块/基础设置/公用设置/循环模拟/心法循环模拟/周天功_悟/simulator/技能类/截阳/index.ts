// import 循环主类 from '../main'
import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 截阳 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '截阳')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放后() {
    this.保存释放记录()
    this.模拟循环.添加buff?.({ 名称: '截阳无双', 对象: '自身' })
    this.模拟循环.添加buff?.({ 名称: '截阳伤害', 对象: '自身' })
    this.触发伤害行为('截阳·悟', 1)
    this.模拟循环.卸除buff?.({ 名称: '一阳指增伤', 对象: '自身' })
    this.技能回复能量(40, '督脉')
    this.减少绝技技能CD(每秒郭氏帧 * 2)
    this.减少轻功技能CD(每秒郭氏帧 * 1)
    this.对阵招式橙武减少绝技技能CD()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('截阳无双')
    this.本次释放记录 = {
      造成buff数据: 造成buff数据 ? 造成buff数据 : undefined,
      重要buff列表: this.获取当前重要buff列表(['大橙武增伤', '截阳无双', '读条增伤']),
    }
  }
}

export default 截阳

export const 截阳类型 = typeof 截阳
