import 技能统一类 from '../../通用类/技能统一类'

class 删除丹青 extends 技能统一类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this?.模拟循环?.删除待生效事件队列('雨墨判定')
    this?.模拟循环?.删除待生效事件队列('丹青判定')
    this.模拟循环.卸除buff({ 名称: '雨墨', 对象: '目标' })
    this.模拟循环.卸除buff({ 名称: '丹青', 对象: '目标' })
  }
}

export default 删除丹青

export const 删除丹青类型 = typeof 删除丹青
