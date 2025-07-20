import 获取当前数据 from '@/数据/数据工具/获取当前数据'

export const PEIZHUANG_BACKGROUND_URL_PREFIX = `https://cdn.jx3box.com/static/pz/img/overview/horizontal/`

const { 所属门派 } = 获取当前数据()

export const 获取配装背景图片 = () => {
  return `${PEIZHUANG_BACKGROUND_URL_PREFIX}${所属门派}.png`
}
