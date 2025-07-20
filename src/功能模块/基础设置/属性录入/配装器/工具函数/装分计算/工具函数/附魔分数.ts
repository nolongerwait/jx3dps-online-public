import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 附魔 } = 获取当前数据()

/**
 * 获取附魔分数
 * 附魔分数为固定值，直接取数据中的附魔数值
 * @param {string} 附魔名称
 * @return {number}
 */
export function 获取附魔分数(附魔名称) {
  const 当前附魔数据 = 附魔?.find((数据) => 数据.附魔名称 === 附魔名称)
  if (当前附魔数据) {
    return 当前附魔数据?.附魔装分 || 0
  } else {
    return 0
  }
}
