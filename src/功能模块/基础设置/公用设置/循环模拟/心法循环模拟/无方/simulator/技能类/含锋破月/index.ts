import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 含锋破月 extends 有CD技能通用类 {
  // scripts/skill/北天药宗/北天药宗_含锋破月.lua
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '含锋破月')

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放() {
    if (this.模拟循环.当前自身buff列表?.['飞叶满襟']?.当前层数) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中() {
    this.保存释放记录('含锋破月')
    this.触发伤害行为('含锋破月')
    if (!this.模拟循环.校验奇穴是否存在('逆势')) {
      this.模拟循环.技能类实例集合.逆乱?.引爆并重新刷新(2, '含锋破月')
    }
    this.模拟循环.添加buff({ 名称: '飞叶满襟', 对象: '自身' })
  }

  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['相使']),
    }
  }
}

export default 含锋破月

export const 含锋破月类型 = typeof 含锋破月
