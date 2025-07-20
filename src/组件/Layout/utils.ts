export type WatermarkOptions = {
  text: string
  rotate?: number
  fontSize?: number
  opacity?: number
  width?: number
  height?: number
}

export const createWatermark = (options: WatermarkOptions) => {
  const {
    text,
    rotate = -30,
    fontSize = 24,
    opacity = 0.1,
    width = 100,
    height = 0.6,
  } = options

  const canvas = document.createElement('canvas') || {}
  const ctx: any = canvas?.getContext?.('2d')
  const dpr = window.devicePixelRatio || 1

  // 计算文字尺寸
  ctx.font = `${fontSize}px Arial`
  const textWidth = ctx.measureText(text).width

  // 动态设置画布尺寸
  canvas.width = (textWidth + width) * dpr
  canvas.height = textWidth * height * dpr

  // 缩放上下文
  ctx.scale(dpr, dpr)
  ctx.translate(canvas.width / (2 * dpr), canvas.height / (2 * dpr))
  ctx.rotate((rotate * Math.PI) / 180)

  // 绘制文字
  ctx.fillStyle = `rgba(150, 150, 150, ${opacity})`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, 0)

  return canvas.toDataURL('image/png')
}
