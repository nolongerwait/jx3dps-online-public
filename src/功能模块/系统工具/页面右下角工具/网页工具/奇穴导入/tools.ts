import { 奇穴列表数据类型, 奇穴数据类型 } from '@/@types/奇穴'

export const 获取数据 = (数据) => {
  const res: 奇穴列表数据类型[] = []
  const 数据对象 = JSON.parse(数据 || '{}')
  Object.keys(数据对象).forEach((key) => {
    const keyObj = 数据对象[key]
    const keyRes: 奇穴数据类型[] = []
    Object.keys(keyObj).forEach((itemKey) => {
      const data = keyObj[itemKey]
      if (data) {
        keyRes.push({
          奇穴名称: data?.name,
          奇穴图片: `https://icon.jx3box.com/icon/${data?.icon}.png`,
          id: data?.id,
          奇穴描述: data?.desc,
        })
      }
    })
    res.push({
      奇穴列表: keyRes,
    })
  })
  return res
}
