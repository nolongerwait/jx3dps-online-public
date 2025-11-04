export const 快捷添加数据: 快捷添加数据类型[] = [
  {
    名称: '测试快捷',
    技能序列: [
      '天斗旋',
      '祝由_火离',
      '镇星入舆%{"延迟":"GCD"}',
      '列宿游',
      '镇星二段',
      '特效腰坠',
      '兵主逆',
      '天斗旋',
    ],
    color: 'cyan',
  },
]

export interface 快捷添加数据类型 {
  名称: string
  技能序列: string[]
  color?: string
}
