import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 箭形态枚举 } from '../../../constant/enum'

class 金乌见坠 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '金乌见坠')

  constructor(模拟循环) {
    super(模拟循环)

    // 因为横断技能充能信息受奇穴影响，这里做覆盖
    金乌见坠.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '金乌见坠')

    this.初始化技能运行数据()
  }

  获得红箭() {
    // 将箭袋中所有箭变为红箭，如果已经为蓝箭则变为紫箭
    const 新箭袋信息 = (this.模拟循环?.角色状态信息?.箭袋信息 || []).map((item) => {
      return item.箭形态 !== 箭形态枚举.紫箭
        ? {
            箭形态: item.箭形态 === 箭形态枚举.蓝箭 ? 箭形态枚举.紫箭 : 箭形态枚举.红箭,
          }
        : item
    })
    this.模拟循环.角色状态信息.箭袋信息 = 新箭袋信息
  }

  释放() {
    this.获得红箭()

    if (
      this.模拟循环.校验奇穴是否存在('佩弦') &&
      !this.模拟循环.当前自身buff列表?.['橙武']?.当前层数 // CW吞佩弦逻辑
    ) {
      this.模拟循环.添加buff({ 名称: '佩弦', 对象: '自身' })
    }
  }
}

export default 金乌见坠

export const 金乌见坠类型 = typeof 金乌见坠
