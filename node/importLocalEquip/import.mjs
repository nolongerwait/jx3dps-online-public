import { map as 数据源 } from './equipment.mjs'
import iconv from 'iconv-lite'
import { attrMap as 装备属性枚举, 精简特效Map, 装备特效枚举, 装备类型枚举, 精简特效区分等级 } from './attrMap.mjs'
import fs from 'fs'
// import path from 'path'
// 导入本地装备数据

const 赛季英雄普通区分品级 = 35300
const 导入最低品级 = 15500
const 导入最高品级 = 99999

const 装备部位枚举 = {
  primary_weapon: '武器',
  tertiary_weapon: '暗器',
  jacket: '衣服',
  hat: '帽子',
  necklace: '项链',
  ring: '戒指',
  belt: '腰带',
  pendant: '腰坠',
  bottoms: '下装',
  shoes: '鞋子',
  wrist: '护腕',
}

const 功法枚举 = {
  外功: ['外功', '力道', '身法'],
  内功: ['内功', '元气', '根骨'],
}

const 装备ID索引映射 = new Map()

function 获取部位索引(部位, 部位门派分类) {
  if (部位 === 'primary_weapon' && 部位门派分类 === '藏剑') {
    return undefined
  }
  if (部位 === 'secondary_weapon' && 部位门派分类 === '藏剑') {
    return '武器'
  }
  return 装备部位枚举[部位]
}

// 获取全部部位的数据
async function 获取全部部位的数据(本次导入功法) {
  let 数据结果 = {}
  Object.keys(数据源).forEach((部位) => {
    const 该部位数据 = 数据源[部位]
    Object.keys(该部位数据).forEach((部位门派分类) => {
      const 部位索引 = 获取部位索引(部位, 部位门派分类)
      if (!部位索引) {
        return
      }
      Object.keys(该部位数据[部位门派分类]).forEach((部位内外功分类) => {
        Object.keys(该部位数据[部位门派分类][部位内外功分类]).forEach((装备名) => {
          const 实际装备名 = 装备名?.split('#')?.[0]
          const 装备数据 = 该部位数据[部位门派分类][部位内外功分类][装备名]
          const 符合功法 = 功法枚举[本次导入功法]?.includes(装备数据.kind)
          const 装备品级 = 装备数据.level
          if (符合功法 && 装备品级 >= 导入最低品级 && 装备品级 <= 导入最高品级) {
            const 武器伤害对象 = {}
            if (装备数据?.base?.weapon_damage_base) {
              武器伤害对象.武器伤害_最小值 = 装备数据?.base?.weapon_damage_base
              武器伤害对象.武器伤害_最大值 =
                装备数据?.base?.weapon_damage_base + 装备数据?.base?.weapon_damage_rand
            }
            const { 特效效果: 装备特效, 特效等级 } = 判断装备特效(装备数据, 部位索引, 装备名)
            const 装备增益 = 获取增益(装备数据?.magic)
            const 装备增益数据列表 = Object.keys(装备数据?.magic)
            // const 装备来源对象 = 装备来源映射.get(
            //   `${装备数据?.id}${装备数据?.level}`
            // )
            装备ID索引映射.set(`${装备数据?.id}_${装备数据?.level}`, true)
            let 装备详情 = {
              id: 装备数据?.id,
              图标ID: 装备数据?.icon_id,
              uid: 装备数据?.id,
              装备名称: 实际装备名?.replace('_测试用', ''),
              所属门派:
                装备数据.school !== '通用' && 装备数据.school !== '精简' ? 装备数据.school : '通用',
              装备主属性:
                装备数据.kind === '内功' || 装备数据.kind === '外功' ? '通用' : 装备数据.kind,
              装备品级: 装备数据.level,
              ...(特效等级 ? {特效等级: 特效等级} : null),
              ...武器伤害对象,
              ...(装备特效 ? { 装备特效 } : null),
              装备类型: 装备增益数据列表?.includes('pvx_round')
                ? '装备类型枚举.PVX'
                : 装备数据?.max_strength === 8
                ? '装备类型枚举.橙武'
                : 装备特效 === '装备特效枚举.大橙武特效'
                ? '装备类型枚举.橙武'
                : 装备特效?.includes('门派套装')
                ? '装备类型枚举.门派套装'
                : 装备特效?.includes('切糕')
                ? '装备类型枚举.切糕'
                : 装备特效?.includes('水特效') || 装备特效?.includes('龙门飞剑武器')
                ? '装备类型枚举.特效武器'
                : 装备特效?.includes('门派特效武器')
                ? '装备类型枚举.门派特效武器'
                : 装备特效?.includes('风特效')
                ? '装备类型枚举.副本精简'
                : 装备数据.school === '精简'
                ? '装备类型枚举.副本精简'
                : '装备类型枚举.普通',
              装备增益: 装备增益,
              镶嵌孔数组: 获取镶嵌(装备数据?.embed),
            }
            // if (装备来源对象?.装备来源) {
            //   装备详情.装备来源 = 装备来源对象?.装备来源
            // }
            // if (装备特效 === '装备特效枚举.大橙武特效') {
            //   装备详情.装备来源 = [{ 来源类型: '稀世神兵', 来源描述: '玄晶' }]
            // } else if (实际装备名?.includes('无修')) {
            //   装备详情.装备来源 = [{ 来源类型: '试炼', 来源描述: '试炼之地' }]
            // } else if (实际装备名?.includes('寻踪觅宝')) {
            //   装备详情.装备来源 = [{ 来源类型: '挖宝', 来源描述: '寻踪觅宝' }]
            // }
            if (数据结果[部位索引]) {
              数据结果[部位索引].push(装备详情)
            } else {
              数据结果[部位索引] = [装备详情]
            }
          }
        })
      })
    })
  })

  Object.keys(数据结果).forEach((部位) => {
    导出成文件(数据结果[部位], 部位, 本次导入功法)
  })
}

function 获取增益(装备增益) {
  let list = []
  Object.keys(装备增益).forEach((key) => {
    if (装备属性枚举[key]) {
      list.push({
        属性: 装备属性枚举[key],
        值: 装备增益[key],
      })
    } else {
      console.log(`存在未识别装备属性：${key}`)
    }
  })
  return list
}

function 获取镶嵌(装备增益) {
  let list = []
  Object.keys(装备增益).forEach((key) => {
    if (装备属性枚举[key]) {
      list.push({
        镶嵌类型: 装备属性枚举[key],
      })
    } else {
      console.log(`存在未识别镶嵌属性：${key}`)
    }
  })
  return list
}

function 判断装备特效(装备数据, 部位索引, 装备名) {
  let 特效效果 = undefined
  let 特效等级 = undefined
  // 大CW
  if (装备数据.max_strength === 8 && 部位索引 === '武器') {
    if (Object.keys(装备数据?.recipes)?.length && !Object.keys(装备数据?.gains)?.length) {
      特效效果 = '装备特效枚举.小橙武特效'
    } else {
      特效效果 = '装备特效枚举.大橙武特效'
    }
  }
  else if (部位索引 === '武器' && 装备名.includes('特效') && !装备名?.includes('寻踪觅宝')) {
    // 处理水特效和门派特效武器
    if (装备数据?.gains?.length < 2) {
      特效效果 = '装备特效枚举.水特效武器'
    } else {
      特效效果 = '装备特效枚举.门派特效武器'
    }
  }
  else if (装备数据?.sets) {
    if (装备数据?.sets?.['2']?.attributes?.all_critical_power_base && 装备数据?.sets?.['4']?.recipes) {
      特效效果 = '装备特效枚举.门派套装'
    }
    else if (装备数据?.sets?.['2']?.attributes?.['all_critical_strike_base']) {
      if (装备数据.level > 赛季英雄普通区分品级) {
        特效效果 = '装备特效枚举.切糕_英雄'
      } else {
        特效效果 = '装备特效枚举.切糕_普通'
      }
    }
    else if (装备数据?.sets?.['2']?.attributes?.['all_major_base']) {
      特效效果 = '装备特效枚举.冬至套装'
    }
  }
  if (装备数据?.gains && !特效效果) {
    const 特效key = 装备数据?.gains?.[0]
    if (特效key && 特效key?.includes('gain_')) {
      Object.keys(精简特效Map).forEach((key) => {
        if (特效key.includes(key)) {
          特效效果 = `装备特效枚举.${精简特效Map[key]}`
        }
      })
      if (特效效果) {
        精简特效区分等级.forEach((key) => {
          if (特效key.includes(key)) {
            let 特效key数组 = 特效key?.split('_') || []
            特效等级 = 特效key数组[特效key数组.length - 1]
          }
        })
      }
    }
  }
  // 特效腰坠
  if (部位索引 === '腰坠' && !特效效果) {
    if (装备名.includes('特效')) {
      特效效果 = '装备特效枚举.风特效腰坠'
    }
  }
  return { 特效效果, 特效等级 }
}

function 导出成文件(数据, 部位, 功法) {
  // 判断文件夹是否存在
  if (!fs.existsSync('导出装备')) {
    fs.mkdirSync('导出装备', { recursive: true })
  }
  if (!fs.existsSync(`导出装备/${功法}`)) {
    fs.mkdirSync(`导出装备/${功法}`, { recursive: true })
  }
  if (!fs.existsSync(`导出装备/${功法}/${部位}`)) {
    fs.mkdirSync(`导出装备/${功法}/${部位}`, { recursive: true })
  }

  let 排序后数据 = [...数据]
  排序后数据.sort((a, b) => {
    if (b.装备品级 !== a.装备品级) {
      return b.装备品级 - a.装备品级
    } else {
      return b.id - a.id
    }
  })

  if (部位 === '武器') {
    排序后数据.sort((a, b) => {
      if (a.装备特效 === '装备特效枚举.大橙武特效' && b.装备特效 !== '装备特效枚举.大橙武特效') {
        return -1 // a 在前
      }
      if (a.装备特效 !== '装备特效枚举.大橙武特效' && b.装备特效 === '装备特效枚举.大橙武特效') {
        return 1 // b 在前
      }
      return 0 // 保持原来的顺序
    })
  } else if (部位 === '戒指') {
    排序后数据.sort((a, b) => {
      if (a.装备类型 === '装备类型枚举.橙武' && b.装备类型 !== '装备类型枚举.橙武') {
        return 1 // a 在前
      }
      if (a.装备类型 !== '装备类型枚举.橙武' && b.装备类型 === '装备类型枚举.橙武') {
        return -1 // b 在前
      }
      return 0 // 保持原来的顺序
    })
  } else if (部位 === '腰坠') {
    排序后数据.sort((a, b) => {
      if (a.装备类型 === '装备类型枚举.橙武' && b.装备类型 !== '装备类型枚举.橙武') {
        return -1 // a 在前
      }
      if (a.装备类型 !== '装备类型枚举.橙武' && b.装备类型 === '装备类型枚举.橙武') {
        return 1 // b 在前
      }
      return 0 // 保持原来的顺序
    })
  }

  const 文件名称 = `导出装备/${功法}/${部位}/index.ts`
  let 生成文本 = JSON.stringify(排序后数据)
  装备特效枚举?.forEach((item) => {
    生成文本 = 生成文本.replaceAll(`"装备特效枚举.${item}"`, `装备特效枚举.${item}`)
  })
  装备类型枚举?.forEach((item) => {
    生成文本 = 生成文本.replaceAll(`"装备类型枚举.${item}"`, `装备类型枚举.${item}`)
  })
  Object.values(装备属性枚举).forEach((value) => {
    生成文本 = 生成文本.replaceAll(`"${value}"`, `${value}`)
  })
  // .replaceAll(`"`, '')
  // .replaceAll(`装备名称:`, `装备名称:"`)
  // .replaceAll(`,所属门派:`, `",所属门派:"`)
  // .replaceAll(`,装备主属性:`, `",装备主属性:"`)
  // .replaceAll(`来源类型:`, `来源类型:"`)
  // .replaceAll(`,来源描述:`, `",来源描述:"`)
  // .replaceAll(`,装备品级`, `",装备品级`)
  const 是否包含装备特效 = 生成文本?.includes('装备特效枚举')
  const 是否有镶嵌 = 生成文本?.includes('镶嵌增伤类型枚举')
  // console.info(`${部位}文件已创建`)
  fs.writeFile(
    文件名称,
    `
import { 属性类型 } from '@/@types/属性'
${是否有镶嵌 ? `import { 镶嵌增伤类型枚举 } from '@/@types/枚举'` : ''}
import { 装备属性信息模型, ${
      是否包含装备特效 ? '装备特效枚举,' : ''
    } 装备类型枚举 } from '@/@types/装备'

const ${部位}装备数据: 装备属性信息模型[] = ${生成文本}

export default ${部位}装备数据
  `,
    (err) => {
      if (err) {
        console.info('err', err)
      }
    }
  )
  console.info(`【${功法}】【${部位}】文件导入成功，成功导入${数据?.length}件装备`)
}

// 初始化数据加载（建议服务启动时执行）
function 生成装备来源映射() {
  try {
    // const __dirname = path.dirname(new URL(import.meta.url).pathname)
    const filePath = ''
    if (!filePath) {
      throw new Error('equipdb.txt 文件路径未找到')
    }
    const mapfilePath = ''
    if (!mapfilePath) {
      throw new Error('mapfilePath.tab 文件路径未找到')
    }
    const content = iconv.decode(fs.readFileSync(filePath), 'gbk')
    const lines = content.split('\n').filter((line) => line.trim())

    const headers = lines[0].split('\t')
    const idIndex = headers.indexOf('ID')
    const levelIndex = headers.indexOf('Level')
    const descIndex = headers.indexOf('Get_Desc')
    const typeIndex = headers.indexOf('GetType')
    const mapIndex = headers.indexOf('BelongMapID')

    const map_content = iconv.decode(fs.readFileSync(mapfilePath), 'gbk')
    const map_lines = map_content.split('\n').filter((line) => line.trim())
    const map_headers = map_lines[0].split('\t')
    const map_idIndex = map_headers.indexOf('ID')
    const map_nameIndex = map_headers.indexOf('DisplayName')

    let belongMapMap = new Map()

    for (let i = 1; i < map_lines.length; i++) {
      const fields = map_lines[i].split('\t')
      const id = Number(fields[map_idIndex])
      const name = fields[map_nameIndex] || ''
      belongMapMap.set(id, name)
    }

    // 构建内存映射
    for (let i = 1; i < lines.length; i++) {
      const fields = lines[i].split('\t')
      const id = Number(fields[idIndex])
      const level = Number(fields[levelIndex])
      if (!装备ID索引映射.get(`${id}_${level}`)) {
        continue
      }
      const getDesc = fields[descIndex] || ''
      const getType = fields[typeIndex] || ''
      const belongMap = fields[mapIndex] || ''

      /**
       * 根据观察到的规则
       * getType： 掉落类型，多个类型使用,隔开
       * getDesc：掉落描述，多个描述使用,隔开。其中若对应位置的getType为副本，则为数组，数组代表副本的多个boss，用,隔开
       * belongMap：掉落地图ID，多个地图使用,隔开，对应副本中
       * 例：副本 {[侯青,薛琢玉],[池清川]} 688,710
       */

      const getTypeList = getType?.split(',')
      const belongMapList = belongMap?.split(',')
      const getDescStr = getDesc?.replaceAll('{', '')?.split('},')
      let sourceList = []

      getTypeList?.forEach((type, index) => {
        if (type === '副本') {
          const currentDesc = getDescStr[index]
          const descList = currentDesc?.replaceAll('}', '')?.replaceAll('[', '')?.split('],')
          const mapList = []
          descList?.forEach((desc, dIndex) => {
            const 掉落地图ID = +belongMapList[dIndex]
            const 掉落地图名称 = belongMapMap.get(掉落地图ID)
            mapList.push({
              掉落描述: desc?.replaceAll(']', ''),
              掉落地图: 掉落地图名称 || '未知地图',
            })
          })
          if (type) {
            sourceList.push({
              来源类型: type,
              来源描述: mapList,
            })
          }
        } else {
          if (type) {
            sourceList.push({
              来源类型: type,
              来源描述: getDescStr[index]?.replaceAll('}', ''),
            })
          }
        }
      })
      if (sourceList?.length) {
        装备来源映射.set(`${id}_${level}`, sourceList)
      }
    }
    console.log(`已加载 ${装备来源映射.size} 条装备数据`)

    const obj = Object.fromEntries(装备来源映射)

    // 写入装备来源映射
    fs.writeFile('装备来源映射.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {
      if (err) {
        console.info('err', err)
      } else {
        console.log('文件写入成功')
      }
    })

    const mapObj = Object.fromEntries(belongMapMap)

    // 写入地图ID映射
    fs.writeFile('地图ID映射.json', JSON.stringify(mapObj, null, 2), 'utf8', (err) => {
      if (err) {
        console.info('err', err)
      } else {
        console.log('文件写入成功')
      }
    })

    belongMapMap.clear()
  } catch (error) {
    console.error('初始化装备数据失败:', error)
  }
}

let 装备来源映射 = new Map()

async function 获取装备数据() {
  const 本次导入功法列表 = ['外功', '内功']
  for (let i = 0; i < 本次导入功法列表.length; i++) {
    console.info(`----------开始导入${本次导入功法列表[i]}----------`)
    await 获取全部部位的数据(本次导入功法列表[i])
    console.info(`----------${本次导入功法列表[i]}导入结束----------`)
  }
  await 生成装备来源映射()
  装备来源映射.clear()
  装备ID索引映射.clear()
}

获取装备数据()
