// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 青冥 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新青冥() {
    const 当前最后一跳青冥数据 =
      this?.DOT运行数据?.待生效数据?.[this?.DOT运行数据?.待生效数据?.length - 1] || {}
    const 当前青冥层数 = 当前最后一跳青冥数据?.当前层数 || 0
    const 青冥最大层数 = this?.模拟循环?.Buff和Dot数据?.青冥?.最大层数 || 1
    const 添加青冥层数 = 1
    const 新青冥层数 = Math.min(当前青冥层数 + 添加青冥层数, 青冥最大层数)
    const 数据 = this.获取当前DOT数据('青冥')
    this.更新待生效数据(新青冥层数, 数据)
  }

  结算青冥伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据 } = this.结算并更新运行数据(事件时间)

    待生效数据?.forEach((数据) => {
      const 生效时间 = 数据.生效时间 || 0
      const 快照buff列表 = 数据.快照buff列表 || []
      if (生效时间) {
        this.触发伤害行为('青冥(DOT)', 1, 快照buff列表, 生效时间)
      }
    })
  }
}

export default 青冥

export const 青冥DOT类型 = typeof 青冥
