import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 钩吻断肠 extends 技能统一类 {
  // scripts/skill/北天药宗/北天药宗_钩吻断肠.lua
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '钩吻断肠')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this.保存释放记录('钩吻断肠')

    if (this?.模拟循环?.校验奇穴是否存在('相使')) {
      this?.模拟循环?.添加buff?.({ 名称: '相使', 对象: '自身' })
    }

    if (this.六微校验()) {
      this.改变温寒(2, '钩吻断肠_六微')
      this.触发伤害行为('六微')
    }

    this.改变温寒(1, '钩吻断肠')
    this.触发伤害行为('钩吻断肠')
    this.模拟循环.技能类实例集合?.逆乱?.获得和刷新逆乱?.()
  }

  六微校验() {
    return this.模拟循环.校验奇穴是否存在('六微') && this?.模拟循环?.角色状态信息?.温寒 <= -5
  }

  保存释放记录(名称) {
    const 造成buff数据 = this.获取施加重要buff信息('相使')
    this.本次释放记录 = 造成buff数据
      ? { 造成buff数据, 实际伤害技能: 名称, 重要buff列表: this.获取当前重要buff列表(['相使']) }
      : {
          实际伤害技能: 名称,
          重要buff列表: this.获取当前重要buff列表(['相使']),
        }
  }
}

export default 钩吻断肠

export const 商陆缀寒类型 = typeof 钩吻断肠
