// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 闪刀 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '闪刀')
  static 消耗怒气 = 0

  constructor(模拟循环) {
    super(模拟循环)

    闪刀.消耗怒气 = 15
  }
  释放() {
    const 当前怒气 = this.模拟循环.角色状态信息?.怒气 || 0
    if (当前怒气 < 闪刀.消耗怒气) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.怒气不足,
      }
    }

    return { 可以释放: true }
  }
  命中() { }

  造成伤害(索引) {
    this.触发伤害行为('闪刀')
    this.触发血誓效果()
    this.模拟循环.技能类实例集合?.盾击?.触发援戈伤害?.()
    this.模拟循环.技能类实例集合?.业火麟光?.触发麟光玄甲伤害?.()
  }

  释放后() {
    this.触发消耗怒气(闪刀.消耗怒气, 闪刀.技能数据?.技能名称)
    this.保存释放记录()
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['血怒', '血怒_惊涌', '嗜血', '麟光玄甲', '援戈', '橙武']),
    }
  }
}

export default 闪刀
export const 闪刀类型 = typeof 闪刀
