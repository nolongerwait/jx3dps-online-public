/**
 * @name 秘籍存储数据
 */

export interface 选中秘籍信息 {
  // key 技能名称 value 选择秘籍名称列表
  [key: string]: string[]
}

/**
 * @name 技能秘籍信息
 */

export interface 技能秘籍信息 {
  /**
   * @name 技能名称
   */
  技能名称: string
  /**
   * @name 技能秘籍列表
   */
  技能秘籍列表: string[]
}
