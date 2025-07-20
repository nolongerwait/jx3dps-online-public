import { 属性加成 } from '@/@types/属性'

export interface 阵眼数据类型 {
  /**
   * @name 阵眼名称
   */
  阵眼名称: string
  /**
   * @name 阵眼标题
   * @description 用于展示的标题，不输入则展示阵眼名称
   */
  阵眼标题?: string
  /**
   * @name 所属心法
   * 非当前心法不会展示
   */
  所属心法?: string
  /**
   * @name 过滤心法
   * 非当前心法不会展示
   */
  过滤心法?: string
  /**
   * @name 阵眼全名
   * 例：九音惊弦阵
   */
  阵眼全名?: string
  /**
   * @name 增益集合
   */
  增益集合?: 阵眼增益[]
  /**
   * @name 伤害提升百分比
   */
  伤害提升百分比?: number
  /**
   * @name 伤害是否提升
   */
  伤害是否提升?: boolean
  /**
   * @name 伤害排名
   */
  伤害排名?: number
  /**
   * @name 部分阵眼覆盖率
   */
  覆盖率?: number
  /**
   * @name 说明
   */
  说明?: string
  /**
   * @name 图标
   */
  图标?: string
}

export interface 阵眼增益 extends 属性加成 {
  /**
   * 代表本增益为触发形增益，不体现在面板上
   */
  触发型增益?: true
}
