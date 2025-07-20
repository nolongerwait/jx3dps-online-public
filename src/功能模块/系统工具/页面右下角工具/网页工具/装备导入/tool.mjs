import axios from 'axios'

const 魔盒配装接口 = axios.create({
  baseURL: 'https://node.jx3box.com', // 设置 baseURL 为您的服务器地址
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要设置其他请求头
  },
})

// 查询武器
const 获取魔盒武器数据 = (params) => 魔盒配装接口.get(`/equip/weapon`, { params: params })
const 获取魔盒装备数据 = (params) => 魔盒配装接口.get(`/equip/armor`, { params: params })
const 获取魔盒饰品数据 = (params) => 魔盒配装接口.get(`/equip/trinket`, { params: params })


import { 接口装备数据格式化 } from './utils.mjs'
import 赛季范围数据 from './赛季范围数据.mjs'

export const 获取数据 = async ({ 功法, 装备部位, 品级范围, 装备质量, 所属方向 = "1" }) => {
  const 接口 = [0, 1]?.includes(装备部位)
    ? 获取魔盒武器数据
    : [4, 5, 7]?.includes(装备部位)
    ? 获取魔盒饰品数据
    : 获取魔盒装备数据

  let 当前请求页 = 1

  const 参数 = {
    position: 装备部位,
    pv_type: 所属方向, // 1PVE 3PVX
    duty: 功法,
    // MagicKind: '力道,身法,外功',
    Quality: 装备质量 || undefined, // 4 紫武 ，5 橙武
    page: 当前请求页,
    per: 500,
    min_level: Math.max(品级范围?.[0] - 1, 0), // 防止左开右闭，多查一层
    max_level: Math.max(品级范围?.[1] + 1, 0),
  }

  const 结果 = await 接口(参数)
  let 结果数据数组 = 结果?.data?.list || []
  const 总数 = 结果?.data?.total
  while (总数 > 结果?.data?.list?.length) {
    const 翻页数据 = await 接口({...参数,page:当前请求页 + 1})
    当前请求页 = 当前请求页 + 1
    const 翻页数据数组 = 翻页数据?.data?.list || []
    if (翻页数据数组?.length) {
      结果数据数组 = 结果数据数组.concat(翻页数据数组)
    } else {
      break
    }
  }

  const 处理后数据 = 接口装备数据格式化(结果数据数组, 赛季范围数据)
  // 处理里面叫“测试装备”的数据
  return 处理后数据.filter(item => item?.装备名称 !== "测试装备" && item?.装备名称 !== "测试武器" )
}
