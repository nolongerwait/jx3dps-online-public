// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 绝刀 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '绝刀')

  constructor(模拟循环) {
    super(模拟循环)
  }



  释放() {
    const 当前怒气 = this.模拟循环.角色状态信息?.怒气 || 0
    if (当前怒气 < 10) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.怒气不足,
      }
    }

    return { 可以释放: true }
  }
  命中() {
    // 1. 先判定橙武BUFF - 有橙武BUFF时不消耗任何东西
    const 有橙武BUFF = this.模拟循环.当前自身buff列表?.['橙武']?.当前层数
    if (有橙武BUFF) {
      // 橙武BUFF期间绝刀不消耗怒气，也不消耗狂绝
      return
    }

    // 2. 没有橙武BUFF，检查是否有狂绝BUFF
    const 有狂绝 = this.模拟循环.当前自身buff列表?.['狂绝']?.当前层数
    if (有狂绝) {
      // 有狂绝时不消耗怒气，但消耗狂绝BUFF
      this.模拟循环.卸除buff?.({ 名称: '狂绝', 对象: '自身', 卸除层数: 1 })
    } else {
      // 3. 没有橙武BUFF也没有狂绝，正常消耗怒气
      const 当前怒气 = this.模拟循环.角色状态信息?.怒气 || 0
      const 消耗怒气 = Math.min(Math.floor(当前怒气 / 10) * 10, 50) // 10/20/30/40/50点
      this.模拟循环.消耗怒气?.(消耗怒气, '绝刀')
    }
  }

  造成伤害() {
    const 怒气信息 = this.绝刀怒气增伤()
    const 有血怒_惊涌 = this.模拟循环.当前自身buff列表?.['血怒·惊涌']?.当前层数

    // 使用统一的绝刀技能，但通过倍率调整伤害，并添加绝返增益
    this.触发伤害行为('绝刀', 1, [`绝返·${怒气信息.绝返等级}`], undefined, false, 1)

    if (有血怒_惊涌) {
      //绝破和惊涌绝破是另外的一个技能，不是苍云破招32745
      this.触发伤害行为('破·绝刀惊涌', 1, [`绝返·${怒气信息.绝返等级}`], undefined, false, 怒气信息.绝破等级)
    } else {
      this.触发伤害行为('破·绝刀', 1, [`绝返·${怒气信息.绝返等级}`], undefined, false, 怒气信息.绝破等级)
    }
    this.触发血誓效果()
    this.模拟循环.技能类实例集合?.盾击?.触发援戈伤害?.()
    this.模拟循环.技能类实例集合?.业火麟光?.触发麟光玄甲伤害?.()
    // 嗜血晚于绝刀伤害生效，没有嗜血时释放绝刀，绝刀及相关伤害均无法获得嗜血加成
    this.模拟循环.添加buff?.({ 名称: '嗜血', 对象: '自身', 新增层数: 1 })
  }

  释放后() {
    this.保存释放记录()
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['血怒', '血怒_惊涌', '嗜血', '麟光玄甲', '援戈', '橙武']),
    }
  }
}

export default 绝刀
export const 绝刀类型 = typeof 绝刀
