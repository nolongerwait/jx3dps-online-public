import { hexToRgbaToDark } from '@/工具函数/help'

export const 默认系统渐变色 = (主题色) => {
  const color1 = hexToRgbaToDark(主题色, '0.3', 35)
  const color2 = hexToRgbaToDark(主题色, '0.05', 25)
  return `linear-gradient(to right, ${color1} 20%, ${color2} 100%)`
}
