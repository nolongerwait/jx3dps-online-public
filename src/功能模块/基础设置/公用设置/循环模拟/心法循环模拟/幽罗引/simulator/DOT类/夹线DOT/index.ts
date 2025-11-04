// import 循环主类 from '../main'
// import { 获取实际帧数 } from '@/工具函数/data'
import 通用DOT类 from '../../通用类/通用DOT类'

class 夹线DOT extends 通用DOT类 {

  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新夹线DOT() {
    const 当前最后一跳夹线DOT数据 =
      this?.DOT运行数据?.待生效数据?.[this?.DOT运行数据?.待生效数据?.length - 1] || {}
    const 当前夹线DOT层数 = 当前最后一跳夹线DOT数据?.当前层数 || 0
    const 夹线DOT最大层数 = this?.模拟循环?.Buff和Dot数据?.夹线DOT?.最大层数 || 1
    const 添加夹线DOT层数 = 1
    const 新夹线DOT层数 = Math.min(当前夹线DOT层数 + 添加夹线DOT层数, 夹线DOT最大层数)
    const 数据 = this.获取当前DOT数据('夹线DOT')
    this.更新待生效数据(新夹线DOT层数, 数据)
    this.保存释放记录('夹线DOT')
  }

  结算夹线DOT伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据 } = this.结算并更新运行数据(事件时间)

    待生效数据?.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      const 快照buff列表 = 数据.快照buff列表 || []
      if (生效时间) {
        this.触发伤害行为('刻木(DOT)', 1, 快照buff列表, 生效时间, 层数)
      }
    })
  }

  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['夹线']),
    }
  }
}

export default 夹线DOT

export const 夹线DOT类型 = typeof 夹线DOT
