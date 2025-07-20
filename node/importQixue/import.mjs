import fs from 'fs'
import 奇穴数据 from './data.json' assert { type: 'json' }

export const 获取数据 = (数据) => {
  const res = []
  const 数据对象 = JSON.parse(数据 || '{}')
  Object.keys(数据对象).forEach((key) => {
    const keyObj = 数据对象[key]
    const keyRes = []
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

const 心法列表 = [
  '孤锋诀',
  '凌海诀',
  '太玄经',
  '无方',
  '花间游',
  '毒经',
  '易筋经',
  '分山劲',
  '北傲诀',
  '紫霞功',
  '傲血战意',
  '周天功',
]

// 生成id和附魔名称的转换枚举
async function 获取心法奇穴数据(心法) {
  const 该心法奇穴原始数据 = 奇穴数据?.[心法]
  const 最终结果 = 获取数据(JSON.stringify(该心法奇穴原始数据))
  导出成文件(最终结果, 心法)
}

function 导出成文件(数据, 心法) {
  const 文件名称 = `src/心法模块/心法/${心法}/奇穴/index.ts`
  const 生成文本 = JSON.stringify(数据)
  // console.info(`${部位}文件已创建`)
  fs.writeFile(
    文件名称,
    `
import type { 奇穴列表数据类型 } from '@/@types/奇穴'

const 奇穴数据: 奇穴列表数据类型[] = ${生成文本}

export default 奇穴数据
  `,
    (err) => {
      if (err) {
        console.info('err', err)
      }
    }
  )
  console.info(`附魔文件导入成功`)
}

async function 获取奇穴数据() {
  for (let i = 0; i < 心法列表.length; i++) {
    console.info(`----------开始导入${心法列表[i]}----------`)
    await 获取心法奇穴数据(心法列表[i])
    console.info(`----------${心法列表[i]}奇穴导入结束----------`)
  }
}

获取奇穴数据()
