import { useEffect, useState } from 'react'

// 持久化存储键名
const REFRESH_RECORD_KEY = 'refresh_guard'

// 限制配置
const LIMIT_CONFIG = {
  count: 5, // 限制次数
  seconds: 10, // 限制时间（秒）
}

interface RefreshRecord {
  timestamps: number[] // 历史时间戳数组
  triggered: boolean // 是否已触发限制
}

export function useRefreshGuard(onTrigger: () => void) {
  const [isLimited, setIsLimited] = useState(false)

  useEffect(() => {
    // 获取当前时间戳
    const now = Date.now()

    // 读取存储记录
    const rawRecord = localStorage.getItem(REFRESH_RECORD_KEY)
    const currentRecord: RefreshRecord = rawRecord
      ? JSON.parse(rawRecord)
      : { timestamps: [], triggered: false }

    // 计算有效时间范围
    const validThreshold = now - LIMIT_CONFIG.seconds * 1000

    // 过滤出有效时间戳（5秒内）
    const validTimestamps = currentRecord.timestamps.filter(
      (ts) => ts > validThreshold
    )

    // 更新记录（添加当前时间戳）
    const newTimestamps = [...validTimestamps, now]
    const newRecord: RefreshRecord = {
      timestamps: newTimestamps,
      triggered: newTimestamps.length >= LIMIT_CONFIG.count,
    }

    // 存储更新后的记录
    localStorage.setItem(REFRESH_RECORD_KEY, JSON.stringify(newRecord))

    // 触发限制逻辑
    if (newRecord.triggered) {
      setIsLimited(true)
      onTrigger()
      localStorage.removeItem(REFRESH_RECORD_KEY)
    }
  }, [onTrigger])

  // 提供重置方法
  const resetGuard = () => {
    localStorage.removeItem(REFRESH_RECORD_KEY)
    setIsLimited(false)
  }

  return { isLimited, resetGuard }
}
