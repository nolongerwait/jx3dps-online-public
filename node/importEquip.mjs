import { 获取数据 } from '../src/功能模块/系统工具/页面隐藏工具/开发者工具/装备导入/tool.mjs'
import 赛季范围数据 from '../src/功能模块/系统工具/页面隐藏工具/开发者工具/装备导入/赛季范围数据.mjs'
import fs from 'fs'

const 功法枚举={
  内功: 1,
  外功: 2,
}

const 装备部位枚举 = {
  "武器": 0,
  "暗器": 1,
  "衣服": 2,
  "帽子": 3,
  "项链": 4,
  "戒指": 5,
  "腰带": 6,
  "腰坠": 7,
  "下装": 8,
  "鞋子": 9,
  "护腕": 10
}

// 获取全部部位的数据
async function 获取全部部位的数据(本次导入功法) {  
  // 非武器获取装备
  Object.keys(装备部位枚举).filter(key => key!=="武器").forEach(async key => { 
    const PVE数据 = await 获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举[key],
      品级范围: 赛季范围数据.本赛季默认品级,
      装备质量: 4,
      所属方向:"1"
    })
    const PVX数据 = await 获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举[key],
      品级范围: 赛季范围数据.本赛季默认品级,
      装备质量: 4,
      所属方向:"3"
    })
    const res = PVE数据?.concat(PVX数据)
    if (res?.length) {
      const 排序数组 = 装备排序(res)
      导出成文件(排序数组,key,本次导入功法)
    } else {
      console.info(`【${本次导入功法}】【${key}】数据获取失败`)
    }
  })

  const [紫武PVE数据, 紫武PVX数据,橙武数据 ] = await Promise.all([
    获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举["武器"],
      品级范围: 赛季范围数据.本赛季默认品级,
      装备质量: 4,
      所属方向:"1"
    }),
    获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举["武器"],
      品级范围: 赛季范围数据.本赛季默认品级,
      装备质量: 4,
      所属方向:"3"
    }),
    获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举["武器"],
      品级范围: 赛季范围数据.本赛季橙武器默认品级,
      装备质量: 5,
    }),
  ])

  const 紫武排序数据 = 装备排序((紫武PVE数据 || []).concat(紫武PVX数据 || []))
  const 橙武排序数据 = 装备排序(橙武数据 || [])

  const 结果数据 = 橙武排序数据.concat(紫武排序数据)
  if (结果数据?.length) {
    导出成文件(结果数据, "武器",本次导入功法)
  } else {
    console.info(`【${本次导入功法}】【武器】数据获取失败`)
  }
}

function 导出成文件(数据,部位,功法) {
  // 判断文件夹是否存在
  if (!fs.existsSync('导出装备')) {
    fs.mkdirSync('导出装备', { recursive: true });
  }
  if (!fs.existsSync(`导出装备/${功法}`)) {
    fs.mkdirSync(`导出装备/${功法}`, { recursive: true });
  }
  if (!fs.existsSync(`导出装备/${功法}/${部位}`)) {
    fs.mkdirSync(`导出装备/${功法}/${部位}`, { recursive: true });
  }
  
  const 文件名称 = `导出装备/${功法}/${部位}/index.ts`
  const 生成文本 = JSON.stringify(数据).replaceAll(`"`,'')
  .replaceAll(`装备名称:`,`装备名称:"`)
  .replaceAll(`,所属门派:`,`",所属门派:"`)
  .replaceAll(`,装备主属性:`,`",装备主属性:"`)
  .replaceAll(`,装备品级`,`",装备品级`,)
  const 是否包含装备特效 = 生成文本?.includes('装备特效枚举')
  const 是否有镶嵌 = 生成文本?.includes('镶嵌增伤类型枚举')
  // console.info(`${部位}文件已创建`)
  fs.writeFile(文件名称, `
import { 属性类型 } from '@/@types/属性'
${是否有镶嵌 ? `import { 镶嵌增伤类型枚举 } from '@/@types/枚举'` : ''}
import { 装备属性信息模型, ${是否包含装备特效? '装备特效枚举,':''} 装备类型枚举 } from '@/@types/装备'

const ${部位}装备数据: 装备属性信息模型[] = ${生成文本}

export default ${部位}装备数据
  `, err => {
    if (err) {
      console.info('err',err)
    }
  })
  console.info(`【${功法}】【${部位}】文件导入成功，成功导入${数据?.length}件装备`)
}

async function  获取装备数据() {
  const 本次导入功法列表 =
    process.env.GONG_FA === 'ALL' ?
      ['外功','内功']:
    process.env.GONG_FA === 'magic' ?
      ['内功']
    : ['外功']
  for (let i = 0; i < 本次导入功法列表.length; i++) {
    console.info(`----------开始导入${本次导入功法列表[i]}----------`)
    await 获取全部部位的数据(本次导入功法列表[i])
    console.info(`----------${本次导入功法列表[i]}导入结束----------`)
  }
}

获取装备数据()

// module.exports = 获取全部部位的数据


// 先按品级排序，然后按id排序
function 装备排序 (待排序装备数组) {
  const list = [...待排序装备数组]
  list.sort((a,b) => {
    if (b.装备品级 !== a.装备品级) {
      return b.装备品级 - a.装备品级
    } else {
      return b.id - a.id
    }
  })
  return list
}