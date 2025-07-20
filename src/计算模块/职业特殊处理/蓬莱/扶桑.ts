import { 循环技能详情 } from '@/@types/循环'

export const 蓬莱扶桑动态函数 = (最终循环: 循环技能详情[]) => {
  return 最终循环?.filter((技能) => {
    return !(技能?.技能名称 === '破' && 技能?.技能等级 === 4)
  })
}
