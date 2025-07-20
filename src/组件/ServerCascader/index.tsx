// import { 获取页面参数 } from '@/工具函数/help'
// import { useRequest } from 'ahooks'
import { Cascader } from 'antd'
import React from 'react'

// const filterZoneList = ['國際服', '比赛专区', '缘起大区']

function ServerCascader(props) {
  const { ...options } = props

  // const urlServer = 获取页面参数('server')
  // const urlName = 获取页面参数('name')

  // 开源版不暴露接口，请自行实现接口
  const data = []

  return (
    <Cascader
      showSearch
      placeholder={'请选择服务器'}
      options={data || []}
      expandTrigger='hover'
      {...options}
    />
  )
}

export default ServerCascader
