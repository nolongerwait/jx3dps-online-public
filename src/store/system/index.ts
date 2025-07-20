import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 获取系统默认值 } from '@/工具函数/init'

const { 缓存映射 } = 获取当前数据()

export interface 系统模块类型 {
  增益面板显示状态: boolean
  背景图片显示状态: boolean
  新手引导流程状态: boolean
  当前引导步骤: number
  配装器弹窗显示状态: boolean
}

const 数据默认值 = 获取系统默认值()

const 默认值: 系统模块类型 = {
  ...数据默认值,
}

export const 系统模块 = createSlice({
  name: 'system',
  initialState: 默认值,
  reducers: {
    更新全部系统数据: (state, action: PayloadAction<Partial<系统模块类型>>) => {
      state = { ...state, ...action.payload }
    },
    更新背景图片显示状态: (state, action: PayloadAction<boolean>) => {
      state.背景图片显示状态 = action.payload
      const newData = action.payload ? '1' : '0'
      localStorage.setItem(缓存映射.背景图片显示状态, newData)
    },
    更新增益面板显示状态: (state, action: PayloadAction<boolean>) => {
      state.增益面板显示状态 = action.payload
    },
    更新新手引导流程状态: (state, action: PayloadAction<boolean>) => {
      state.新手引导流程状态 = action.payload
    },
    更新当前引导步骤: (state, action: PayloadAction<number>) => {
      state.当前引导步骤 = action.payload
    },
    切换配装器弹窗显示状态: (state, action: PayloadAction<boolean>) => {
      state.配装器弹窗显示状态 = action.payload
    },
  },
})

export const {
  更新全部系统数据,
  更新背景图片显示状态,
  更新增益面板显示状态,
  更新新手引导流程状态,
  更新当前引导步骤,
  切换配装器弹窗显示状态,
} = 系统模块.actions // 导出操作state的喊出

export const SystemState = (state: RootState) => state

export default 系统模块.reducer // 导出当前reducer在store/index.ts中记性全局挂
