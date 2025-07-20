// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 御波驾澜 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新御波驾澜() {
    const 当前最后一跳御波驾澜数据 =
      this?.DOT运行数据?.待生效数据?.[this?.DOT运行数据?.待生效数据?.length - 1] || {}
    const 当前御波驾澜层数 = 当前最后一跳御波驾澜数据?.当前层数 || 0
    const 御波驾澜最大层数 = this?.模拟循环?.Buff和Dot数据?.御波驾澜?.最大层数 || 3
    const 添加御波驾澜层数 = 1
    const 新御波驾澜层数 = Math.min(当前御波驾澜层数 + 添加御波驾澜层数, 御波驾澜最大层数)
    const 数据 = this.获取当前DOT数据('御波驾澜')
    this.更新待生效数据(新御波驾澜层数, 数据)
  }

  结算御波驾澜伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据 } = this.结算并更新运行数据(事件时间)

    待生效数据?.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      const 快照buff列表 = 数据.快照buff列表 || []
      if (生效时间) {
        this.触发伤害行为('御波驾澜(DOT)', 1, 快照buff列表, 生效时间, 层数)
      }
    })
  }
}

export default 御波驾澜

export const 御波驾澜DOT类型 = typeof 御波驾澜
