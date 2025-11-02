import {map as 数据源} from './enchants.mjs'
import {attrSingleName} from './attrMap.mjs'
import fs from 'fs'

// 生成id和附魔名称的转换枚举
async function 获取全部部位的数据() {  
  let 数据结果 = {}
  Object.keys(数据源).forEach((部位) => {
    const 该部位数据 = 数据源[部位]
    if (该部位数据) {
      Object.keys(该部位数据).forEach((key) => {
        const 附魔数据 = 该部位数据[key]
        if (附魔数据?.id && 附魔数据?.attributes) {
          const 获取属性 = 附魔数据?.attributes
          Object.keys(获取属性)?.forEach(属性 => {
            const 加成值  = 获取属性[属性]
            const 简写 = attrSingleName[属性]
            if (简写) {
              数据结果[附魔数据?.id] = `${简写}+${加成值}`
            }
          })
        }
      })
    }
  })
  导出成文件(数据结果)
}


function 导出成文件(数据) {
  const 文件名称 = `src/数据/附魔/id_map.ts`
  const 生成文本 = JSON.stringify(数据)
  // console.info(`${部位}文件已创建`)
  fs.writeFile(文件名称, `
const 附魔ID枚举 = ${生成文本}
export default 附魔ID枚举
  `, err => {
    if (err) {
      console.info('err',err)
    }
  })
  console.info(`附魔文件导入成功`)
}

async function  获取装备数据() {
  console.info(`----------开始导入附魔----------`)
  await 获取全部部位的数据()
  console.info(`----------附魔导入结束----------`)
}

获取装备数据()



