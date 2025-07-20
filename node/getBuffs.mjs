import axios from 'axios'
import fs from 'fs'

const 魔盒配装接口 = axios.create({
  baseURL: 'https://node.jx3box.com', // 设置 baseURL 为您的服务器地址
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要设置其他请求头
  },
})


const 获取魔盒Buff = (params) => 魔盒配装接口.get(`/resource/std/buff/list`, { params: params })

export const 获取数据 = async () => {
  let 当前请求页 = 1

  const 参数 = {
    strict: false,
    page: 1,
    per: 50,
    include:"parse",
  }

  let 结果数据数组 = []

  const 结果 = await 获取魔盒Buff(参数)
  const 第一页数据 = 结果?.data?.data?.list.filter(item => !!item.Name).map(item => item.Name) || []

  const 塞入结果 = (数据) => {
    let 本次数量 = 0
    for(let i = 0; i < 数据.length; i++) {
      if (!结果数据数组.includes(数据[i])) {
        结果数据数组.push(数据[i])
        本次数量++
      }
    }
    console.info('本次数量',本次数量)
    return 本次数量
  }

  const 最大分页 = 结果?.data?.data?.pages
  // const 总数 = 结果?.data?.data?.total
  console.info(`第${1}页，获取了 ${第一页数据?.length}个Buff`)
  塞入结果(第一页数据)
  while (当前请求页 < 最大分页) {
    const 新请求数组 = [
      当前请求页+1,
      当前请求页+2,
      当前请求页+3,
      当前请求页+4,
      当前请求页+5,
      当前请求页+6,
      当前请求页+7,
      当前请求页+8,
      当前请求页+9,
      当前请求页+10,
    ]
    const 新分页 = 当前请求页 + 10
    当前请求页 = 新分页
    const 翻页数据集合 = await Promise.all(新请求数组.map(item => 获取魔盒Buff({...参数, page: item})))
    for(let i = 0; i<翻页数据集合.length;i++) {
      const 翻页数据数组 = 翻页数据集合?.[i].data?.data?.list || []
      if (翻页数据数组?.length) {
        const 数据 = 翻页数据数组.filter(item => !!item.Name).map(item => item.Name) || []
        const 塞入数量 = 塞入结果(数据)
        console.info(`第${新请求数组[i]}页，获取了 ${塞入数量}个Buff。剩余${最大分页-新分页}页数据。`)
      } else {
        break
      }
    }
  }


  导出成文件(结果数据数组)

  // 处理里面叫“测试装备”的数据
  return 结果数据数组
}

function 导出成文件(数据) {
  const 文件名称 = `导出Buff.json`
  fs.writeFile(文件名称, JSON.stringify(数据), err => {
    if (err) {
      console.error('err',err)
    }
  })
  console.info(`文件导入成功，成功导入${数据?.length}个Buff`)
}

获取数据()

// module.exports = 获取全部部位的数据
