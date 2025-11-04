import { 按数字生成数组 } from '@/工具函数/help'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 获取当前各属性最大附魔 } from '../工具'

const { 系统配置 } = 获取当前数据()
const 百分比数组 = 按数字生成数组(101)

const 放大倍数 = 1

const 附魔列表 = 获取当前各属性最大附魔()

export const 攻击破招收益信息 = [
  {
    label: '攻击破招',
    list: 百分比数组.map((item) => ({
      label: `${item - 1}个附魔`,
      value: item - 1,
    })),
    tip: (
      <div>
        <p>不改变其他属性，只重新覆盖攻击、破招值。用于快速计算攻击和破招的成长曲线</p>
        <p>
          X轴： 重写后的<b style={{ color: 系统配置?.主题色 }}> 不吃增益面板基础攻击、破招分数 </b>
          ，按照附魔比例重新分配属性.
        </p>
        <p>Y轴： 重写属性后的秒伤变化</p>
        <p>比例和结果秒伤为近似值，仅参考作为配装的属性收益趋向参考</p>
        <p style={{ color: 'red' }}>会计算一百次，电脑性能差的慎用</p>
      </div>
    ),
  },
]

export const 渲染攻击破招折线图 = (chart, 收益下降点, 最大值) => {
  chart.axis('攻击收益', false)
  chart.scale({
    攻击收益: {
      min: 0,
      max: 最大值,
    },
    破招收益: {
      min: 0,
      max: 最大值,
    },
  })
  // chart.axis('破招收益', false)

  chart.line().position('比例*攻击收益').size(3).color('hsl(0 65% 48% / 1)')
  chart.line().position('比例*破招收益').size(3).color('rgb(107, 183, 242)')

  if (收益下降点) {
    chart.annotation().dataMarker({
      top: true,
      position: 收益下降点,
      text: {
        content: '收益明显下降：' + 收益下降点.比例,
        style: { fill: '#FFF', fontSize: 16, fontWeight: 500 },
      },
      line: {
        length: 100,
      },
    })
  }
}

export const 获取攻击破招图表数据 = (data, 装备信息, 计算增加后收益, 增益后面板) => {
  const list = data || []
  const 增益后面板基础攻击 = 增益后面板?.基础攻击 || 0
  // const 增益后面板面板攻击 = 增益后面板?.面板攻击 || 0
  const 增益后面板破招值 = 增益后面板?.破招值 || 0
  const 当前面板基础攻击 = 装备信息?.装备基础属性?.基础攻击 || 0
  const 当前面板破招值 = 装备信息?.装备基础属性?.破招值 || 0
  const 当前增益基础攻击差值 = 增益后面板基础攻击 - 当前面板基础攻击
  const 当前增益破招值差值 = 增益后面板破招值 - 当前面板破招值

  const 基础属性 = { ...装备信息?.装备基础属性 }
  const 攻击附魔容量 = 附魔列表?.find((item) => item?.收益 === '攻击')?.值 || 0
  const 破招附魔容量 = 附魔列表?.find((item) => item?.收益 === '破招')?.值 || 0

  const res = list.map((item) => {
    const 当前数值 = item?.value
    const 最终计算基础攻击 = 当前数值 * 攻击附魔容量 * 放大倍数 - 当前增益基础攻击差值
    const 最终计算破招值 = 当前数值 * 破招附魔容量 * 放大倍数 - 当前增益破招值差值

    // 计算攻击收益
    const { 秒伤: 攻击附魔秒伤 } = 计算增加后收益(
      { ...基础属性, 基础攻击: 最终计算基础攻击 + 攻击附魔容量 },
      true,
    )
    const { 秒伤: 攻击新秒伤 } = 计算增加后收益({ ...基础属性, 基础攻击: 最终计算基础攻击 }, true)
    const 攻击收益 = (攻击附魔秒伤 - 攻击新秒伤) / 攻击新秒伤

    // 计算破招收益
    const { 秒伤: 破招附魔秒伤 } = 计算增加后收益(
      { ...基础属性, 破招值: 最终计算破招值 + 破招附魔容量 },
      true,
    )
    const { 秒伤: 破招新秒伤 } = 计算增加后收益({ ...基础属性, 破招值: 最终计算破招值 }, true)
    const 破招收益 = (破招附魔秒伤 - 破招新秒伤) / 破招新秒伤

    return {
      比例: item.label,
      攻击收益: Number(攻击收益.toFixed(3)),
      破招收益: Number(破招收益.toFixed(3)),
    }
  })
  return res
}

export const 获取攻击破招最大值 = (data) => {
  let 最大值 = 0
  data.forEach((item) => {
    if (item.攻击收益 > 最大值) {
      最大值 = item.攻击收益
    }
    if (item.破招收益 > 最大值) {
      最大值 = item.破招收益
    }
  })
  return 最大值
}
