import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 墨海临源 extends 技能统一类 {
  // scripts/skill/万花\万花_点穴截脉_墨海临源.lua
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '墨海临源')

  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    if (!this.模拟循环.角色状态信息?.临源充能) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.充能不足,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中() {
    this.触发伤害行为('临源·一')
    this.触发伤害行为('破', 1, [], this?.模拟循环?.当前时间, 8)
    this.墨意变化(20)
    this.消耗层数()
    this?.保存释放记录('墨海临源')
    this?.涓流函数()
  }

  消耗层数() {
    const 当前临源充能 = this?.模拟循环?.角色状态信息?.临源充能 || 0
    const 新临源充能 = Math.max(0, 当前临源充能 - 1)
    this.模拟循环.角色状态信息.临源充能 = 新临源充能
  }

  获得层数() {
    const 当前临源豆 = this?.模拟循环?.角色状态信息?.临源豆 || 0
    const 当前临源充能 = this?.模拟循环?.角色状态信息?.临源充能 || 0
    if (当前临源充能 < 3) {
      if (当前临源豆 >= 4) {
        // 满了不清空
        const 新临源充能 = Math.min(3, 当前临源充能 + 1)
        this.模拟循环.角色状态信息.临源充能 = 新临源充能
        this.模拟循环.角色状态信息.临源豆 = 0
      } else {
        this.模拟循环.角色状态信息.临源豆 += 1
      }
    }
  }

  保存释放记录(名称) {
    const 保存显示段数 = this.模拟循环.显示涓流层数
      ? this.模拟循环.当前自身buff列表['涓流']?.当前层数 || 0
      : undefined

    this.本次释放记录 = {
      伤害段数: 保存显示段数,
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['钟灵', '倚天', '涓流', '乱洒青荷', '布散畅和']),
    }
  }
}

export default 墨海临源

export const 墨海临源类型 = typeof 墨海临源
