import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 逐波灵游 extends 有CD技能通用类 {
  // lua入口 20084
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '逐波灵游')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this.逐波灵游造成伤害()
    this?.模拟循环?.技能类实例集合?.['驰风震域']?.获得驰风震域()
    this.清源判定()
    this.海碧判定()
    this.保存释放记录('逐波灵游')
  }

  逐波灵游造成伤害() {
    const 鸿轨增益 = this.鸿轨判定() ? ['鸿轨'] : []
    this.触发伤害行为('逐波灵游', 1, 鸿轨增益)
  }

  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表([
        '驰行',
        '澄穆·1',
        '澄穆·2',
        '澄穆·3',
        '太息·1',
        '太息·2',
        '羽彰',
        '梦悠',
      ]),
    }
  }
}

export default 逐波灵游

export const 逐波灵游类型 = typeof 逐波灵游
