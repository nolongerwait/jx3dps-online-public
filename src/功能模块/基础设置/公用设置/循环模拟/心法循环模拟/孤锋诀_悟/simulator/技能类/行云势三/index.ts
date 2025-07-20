import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 行云势三 extends 技能统一类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    const 行链层数 = this.模拟循环.当前自身buff列表?.['行链']?.当前层数
    if (行链层数 !== 2) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    }
  }

  造成伤害() {
    const 当前是否满锐 = this.模拟循环.角色状态信息?.锐意 && this.模拟循环.角色状态信息?.锐意 >= 60
    const 当前流血层数 =
      this.模拟循环?.技能类实例集合?.流血?.DOT运行数据?.待生效数据?.[0]?.当前层数 || 0

    this.触发伤害行为('行云势·悟·三', 1, 当前流血层数 ? ['流血增伤'] : [])
    this.保存释放记录()

    if (当前是否满锐) {
      this.减少对阵技能CD()
    }
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['灭影追风·悟', '披靡·悟', '横云一式', '大橙武增伤']),
    }
  }

  释放后() {
    this.释放技能回复锐意(10, '行云势·悟·三')
    this.模拟循环.卸除buff?.({ 名称: '行链', 对象: '自身', 卸除层数: 2 })
  }
}

export default 行云势三

export const 行云势一类型 = typeof 行云势三
