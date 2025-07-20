import { 每秒郭氏帧 } from '@/数据/常量'
import { 循环基础技能数据类型 } from '../通用框架/类型定义/技能'
import { Buff枚举 } from '../通用框架/类型定义/Buff'

export const 通用循环模拟技能基础数据: 循环基础技能数据类型[] = [
  {
    技能名称: '特效腰坠',
    技能释放后添加GCD: 0,
    技能CD: 每秒郭氏帧 * 180,
    技能GCD组: '自身',
    技能类型: '其他',
    图标: 'https://icon.jx3box.com/icon/22900.png',
  },
]

// Map预备数据
export const 通用Buff数据: Buff枚举 = {
  风特效_英雄_快照: {
    类型: '自身',
    名称: '风特效_英雄_快照',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 15,
    图标: 'https://icon.jx3box.com/icon/3414.png',
  },
  风特效_快照: {
    类型: '自身',
    名称: '风特效_快照',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 15,
    图标: 'https://icon.jx3box.com/icon/3414.png',
  },
}
