import { DOT来源类型 } from '../../type'
import 通用DOT类 from '../../通用类/通用DOT类'

class 兰摧玉折 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新兰摧玉折(来源?: DOT来源类型) {
    const 当前青兰摧玉折层数 = this?.DOT运行数据?.当前层数 || 0
    const 青兰摧玉折最大层数 = this?.模拟循环?.Buff和Dot数据?.兰摧玉折?.最大层数 || 1
    const 添加青兰摧玉折层数 = 1
    const 新青兰摧玉折层数 = Math.min(当前青兰摧玉折层数 + 添加青兰摧玉折层数, 青兰摧玉折最大层数)
    const 数据 = this.获取当前DOT数据('DOT_兰摧玉折')
    this.更新待生效数据(新青兰摧玉折层数, 数据)
    this.DOT运行数据.当前Dot来源 = 来源
    if (来源) {
      this?.更新DOT运行数据({ 当前Dot来源: 来源, 当前Dot实际名称: `兰摧玉折(DOT)·${来源}` })
    } else {
      this?.更新DOT运行数据({ 当前Dot来源: 来源, 当前Dot实际名称: '兰摧玉折(DOT)' })
    }

    if (this?.模拟循环?.校验奇穴是否存在('倚天')) {
      this?.模拟循环?.添加buff({ 名称: '倚天', 对象: '自身' })
    }
  }

  乱洒阳明刷新() {
    this?.获得和刷新兰摧玉折('乱洒')
  }

  阳明引爆() {
    this?.吞噬('阳明指')
  }

  玉石引爆() {
    if (this?.DOT运行数据?.当前层数) {
      this.触发伤害行为('破', 1, [], this?.模拟循环?.当前时间, 2)
    }
    this?.吞噬('玉石')
  }

  吞噬(来源) {
    const 待生效数据 = [...this.DOT运行数据.待生效数据]
    if (待生效数据?.length) {
      const 实际引爆跳数 = 待生效数据?.length
      const 当前DOT层数 = this?.DOT运行数据?.当前层数 || 0
      this.模拟循环.添加战斗日志({
        日志: `【${来源}】吞噬${实际引爆跳数}跳【兰摧玉折】，当前DOT层数为${当前DOT层数}`,
        日志类型: '技能释放结果',
        日志时间: this.模拟循环.当前时间,
      })
      const 引爆倍率 = 当前DOT层数 * 实际引爆跳数
      const 快照buff列表 = this?.DOT运行数据?.快照buff列表 || []
      const 实际吞噬名称 = this?.DOT运行数据?.当前Dot实际名称
      this.触发伤害行为(实际吞噬名称, 1, 快照buff列表, this.模拟循环.当前时间, 引爆倍率)
      this.清空DOT()
      this?.模拟循环?.卸除buff({ 名称: '倚天', 对象: '自身' })
    }
  }

  结算兰摧玉折伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据, 未结算数组 } = this.结算并更新运行数据(事件时间)

    待生效数据?.forEach((数据) => {
      const 层数 = this?.DOT运行数据?.当前层数 || 1
      const 快照buff列表 = this?.DOT运行数据?.快照buff列表 || []
      const 伤害名称 = this?.DOT运行数据?.当前Dot实际名称 || '兰摧玉折(DOT)'
      const 生效时间 = 数据.生效时间 || 0
      if (生效时间) {
        this.触发伤害行为(伤害名称, 1, 快照buff列表, 生效时间, 层数)
      }
    })

    if (未结算数组?.length === 0) {
      this?.模拟循环?.卸除buff({ 名称: '倚天', 对象: '自身' })
    }
  }
}

export default 兰摧玉折

export const 青兰摧玉折DOT类型 = typeof 兰摧玉折
