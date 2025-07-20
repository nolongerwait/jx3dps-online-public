export interface 延迟数据类型 {
  label: string
  value: number
}

/**
 * 当前目标属性
 */
export interface 目标属性类型 {
  /**
   * @name 名称
   */
  名称: string
  /**
   * @name 等级
   */
  等级: number
  /**
   * @name 防御点数
   */
  防御点数: number
  /**
   * @name 防御系数
   */
  防御系数: number
  /**
   * @name 目标类型
   */
  目标类型: '试炼' | '副本' | '木桩'
}
