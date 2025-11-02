// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 拘意 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新拘意() {
    const 数据 = this.获取当前DOT数据('拘意DOT')
    this.更新待生效数据(1, 数据)
  }

  拘意存在判定() {
    const 当前最后一跳拘意数据 =
      this?.DOT运行数据?.待生效数据?.[this?.DOT运行数据?.待生效数据?.length - 1] || {}
    const 当前拘意层数 = 当前最后一跳拘意数据?.当前层数 || 0
    return 当前拘意层数
  }

  结算拘意伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据 } = this.结算并更新运行数据(事件时间)

    待生效数据?.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      const 快照buff列表 = 数据.快照buff列表 || []
      if (生效时间) {
        this.触发伤害行为('拘意(DOT)', 1, 快照buff列表, 生效时间, 层数)
      }
    })
  }
}

export default 拘意

export const 拘意DOT类型 = typeof 拘意
