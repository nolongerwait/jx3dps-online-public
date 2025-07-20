/**
 * @name 基础算法函数工具
 * @description 基础JS相关算法，无业务属性
 */
export const 按数字生成数组 = (number) => {
  return Array.from({ length: number - 1 + 1 }, (_, index) => index + 1)
}
