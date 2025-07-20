/*
 * @Description: 验证码组件
 * @Version: 1.0.0
 * @Date: 2022-04-11 16:12:05
 * @LastEditors: Yawen Yang
 * @LastEditTime: 2022-04-11 17:56:30
 */
import React, { useEffect } from 'react'
import Config from './config'

const GeetestCaptcha = ({ handler }: any) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(window as any).initGeetest4(Config, handler)
  }, [])
  return <div className='captcha' />
}

export default GeetestCaptcha
