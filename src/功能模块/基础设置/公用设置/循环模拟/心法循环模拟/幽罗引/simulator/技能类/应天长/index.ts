import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 应天长 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '穿云')

  constructor(模拟循环) {
    super(模拟循环)
    应天长.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '应天长')
    this.初始化技能运行数据()
  }

  命中() {
    this.回复心络('应天长', 20)
    this.触发伤害行为('应天长', 1)
    this.保存释放记录('应天长')
    // 造成千里急dot
    this.模拟循环.技能类实例集合?.千里急DOT?.获得和刷新千里急()
    this.模拟循环.技能类实例集合?.千里急?.自动释放('应天长')
    this.模拟循环.卸除buff?.({ 名称: '连环慢', 对象: '自身', 卸除层数: 1 })
  }


  保存释放记录(名称) {
    const 是否释放 = this.模拟循环.技能类实例集合?.千里急?.判断当前是否释放千里急()
    this.本次释放记录 = {
      实际伤害技能: 名称,
      伤害段数: 是否释放 ? this.模拟循环.技能类实例集合?.千里急?.当前千里急 : undefined,
      重要buff列表: this.获取当前重要buff列表(['钤束', '虚影']),
    }
  }
}

export default 应天长

export const 应天长类型 = typeof 应天长
