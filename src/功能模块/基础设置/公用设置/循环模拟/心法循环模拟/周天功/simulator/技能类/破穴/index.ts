import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 破穴 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '破穴')
  static 本次释放减少冷却 = 0

  constructor(模拟循环) {
    super(模拟循环)

    //
    破穴.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '破穴')
    破穴.本次释放减少冷却 = 0

    this.初始化技能运行数据()
  }

  命中() {
    this.一阳指胧雾观花云散校验()

    this.触发伤害行为?.('破穴')

    // 神门
    if (this.模拟循环.校验奇穴是否存在?.('神门')) {
      this.触发伤害行为('破', 1, [], undefined, 25 || 1)
      this.模拟循环.添加buff?.({ 名称: '神门', 对象: '自身' })
    }

    if (this.模拟循环.技能类实例集合?.经脉循行?.经脉循行状态校验()) {
      const 当前任脉值 = this.模拟循环.角色状态信息.能量信息.任脉
      const 伤害等级 = Math.ceil(Math.max(Math.min(当前任脉值 * 0.5, 50), 1)) + 1
      this.触发伤害行为('破', 1, [], undefined, 伤害等级 || 1)

      if (this.模拟循环.校验奇穴是否存在?.('然谷')) {
        const 然谷等级 = Math.min(Math.floor(当前任脉值 * 0.05) + 1, 6)
        this.减少调息时间((2 + Math.ceil(然谷等级 / 2)) * 每秒郭氏帧)
      }

      const 神封校验结果 = this.模拟循环.神封校验()
      this.模拟循环.消耗当前一半能量()
      if (神封校验结果) {
        this.模拟循环.神封触发()
      }
      this.模拟循环.技能类实例集合?.经脉循行.经脉循行卸除校验()
    } else {
      this?.模拟循环?.回复能量(15, '任脉')
      this?.模拟循环?.回复能量(15, '督脉')
    }

    this.模拟循环.技能类实例集合?.一阳来复?.减少调息时间?.(每秒郭氏帧 * 6)

    this.模拟循环.判断扬尘()

    const 释放后有无经脉循行 = this.模拟循环.技能类实例集合?.经脉循行.经脉循行状态校验() ? 1 : 2

    this.保存释放记录(释放后有无经脉循行)
  }

  保存释放记录(段数) {
    const 造成buff数据 = this.获取施加重要buff信息('神门')
    if (造成buff数据) {
      this.本次释放记录 = {
        伤害段数: 段数,
        重要buff列表: this.获取当前重要buff列表(['出岫']),
        造成buff数据: 造成buff数据,
      }
    }
  }
}

export default 破穴

export const 破穴类型 = typeof 破穴
