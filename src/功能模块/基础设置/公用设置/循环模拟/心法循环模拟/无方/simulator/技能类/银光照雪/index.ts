import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 银光照雪 extends 有CD技能通用类 {
  // scripts/skill/北天药宗/北天药宗_银光照雪.lua
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '银光照雪')
  static 作用总间隔 = 24
  static 读条时间 = 24
  static 本次释放是否读条 = true

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
    银光照雪.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '银光照雪')
  }

  命中() {
    this.保存释放记录('银光照雪')
    this.触发伤害行为('银光照雪')
    if (this.模拟循环.校验奇穴是否存在('逆势')) {
      this.逆转温寒('银光照雪_逆势')
    }
  }

  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['相使']),
    }
  }
}

export default 银光照雪

export const 银光照雪类型 = typeof 银光照雪
