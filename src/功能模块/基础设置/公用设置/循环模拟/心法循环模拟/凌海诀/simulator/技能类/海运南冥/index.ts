import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 海运南冥 extends 有CD技能通用类 {
  // lua入口 20715
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '海运南冥')
  static 释放重置 = false

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    海运南冥.释放重置 = false

    this.海运南冥造成伤害()
    this.清源判定()
    this.澄穆判定()
    const 海碧判定通过 = this.海碧判定()
    if (海碧判定通过) {
      海运南冥.释放重置 = true
      this.海碧结算()
    }
    this.保存释放记录('海运南冥')
  }

  释放后() {
    if (海运南冥.释放重置) {
      this.更新技能运行数据({ 待充能时间点: [] })
    }
    海运南冥.释放重置 = false
  }

  海运南冥造成伤害() {
    const 鸿轨增益 = this.鸿轨判定() ? ['鸿轨'] : []
    this.触发伤害行为('海运南冥·近', 1, 鸿轨增益)
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

export default 海运南冥

export const 海运南冥类型 = typeof 海运南冥
